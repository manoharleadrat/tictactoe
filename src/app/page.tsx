'use client';

import { useState, useEffect } from 'react';
import { TicTacToeGame, GameState, Score, GameMode, Difficulty } from '@/lib/game';
import GameBoard from '@/components/GameBoard';
import GameInfo from '@/components/GameInfo';
import ScoreBoard from '@/components/ScoreBoard';
import ControlButtons from '@/components/ControlButtons';
import GameSettings from '@/components/GameSettings';

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>('human-vs-ai');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [game] = useState(() => new TicTacToeGame(gameMode, difficulty));
  const [gameState, setGameState] = useState<GameState>(game.getGameState());
  const [score, setScore] = useState<Score>({ human: 0, ai: 0, draws: 0 });

  // Load score from localStorage on component mount
  useEffect(() => {
    const savedScore = localStorage.getItem('tic-tac-toe-score');
    if (savedScore) {
      setScore(JSON.parse(savedScore));
    }
  }, []);

  // Save score to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tic-tac-toe-score', JSON.stringify(score));
  }, [score]);

  // Handle AI moves automatically
  useEffect(() => {
    if (gameState.isAiThinking || game.isAiTurn()) {
      const makeAiMove = async () => {
        await game.makeAiMove();
        const newGameState = game.getGameState();
        setGameState(newGameState);

        // Update score if game is over
        if (newGameState.status === 'won') {
          setScore(prev => ({
            ...prev,
            [newGameState.winner === 'X' ? 'human' : 'ai']: prev[newGameState.winner === 'X' ? 'human' : 'ai'] + 1
          }));
        } else if (newGameState.status === 'draw') {
          setScore(prev => ({
            ...prev,
            draws: prev.draws + 1
          }));
        }
      };

      makeAiMove();
    }
  }, [gameState.currentPlayer, gameState.status]);

  const handleCellClick = async (index: number) => {
    // Don't allow moves during AI thinking or if it's AI's turn
    if (gameState.isAiThinking || (gameMode === 'human-vs-ai' && gameState.currentPlayer === 'O')) {
      return;
    }

    const success = await game.makeMove(index);
    if (success) {
      const newGameState = game.getGameState();
      setGameState(newGameState);

      // Update score if game is over
      if (newGameState.status === 'won') {
        setScore(prev => ({
          ...prev,
          [newGameState.winner === 'X' ? 'human' : 'ai']: prev[newGameState.winner === 'X' ? 'human' : 'ai'] + 1
        }));
      } else if (newGameState.status === 'draw') {
        setScore(prev => ({
          ...prev,
          draws: prev.draws + 1
        }));
      }
    }
  };

  const handleReset = () => {
    game.reset();
    setGameState(game.getGameState());
  };

  const handleUndo = () => {
    const success = game.undoMove();
    if (success) {
      setGameState(game.getGameState());
    }
  };

  const handleGameModeChange = (mode: GameMode) => {
    setGameMode(mode);
    game.setGameMode(mode);
    setGameState(game.getGameState());
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    game.setDifficulty(newDifficulty);
  };

  const resetScore = () => {
    setScore({ human: 0, ai: 0, draws: 0 });
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-purple-400 via-pink-500 to-green-500 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Tic Tac Toe
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Built By Cursor AI with Next.js & TypeScript and Tailwind CSS
           </p>

        </div>

        {/* Game Settings */}
        <GameSettings
          gameMode={gameMode}
          difficulty={difficulty}
          onGameModeChange={handleGameModeChange}
          onDifficultyChange={handleDifficultyChange}
        />

        {/* Game Info */}
        <div className="mb-6">
          <GameInfo gameState={gameState} />
        </div>

        {/* Game Board */}
        <div className="mb-8">
          <GameBoard
            gameState={gameState}
            onCellClick={handleCellClick}
            disabled={gameState.status !== 'playing'}
            winningPattern={game.getWinningPattern()}
          />
        </div>

        {/* Control Buttons */}
        <div className="mb-8">
          <ControlButtons
            gameState={gameState}
            onReset={handleReset}
            onUndo={handleUndo}
          />
        </div>

        {/* Score Board */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Score</h2>
            <button
              onClick={resetScore}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Reset Score
            </button>
          </div>
          <ScoreBoard score={score} />
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>Click on any empty cell to make your move</p>
          <p className="mt-1">
            {gameMode === 'human-vs-ai' 
              ? 'You play as X, AI plays as O' 
              : 'Players take turns'
            }
          </p>
        </div>
      </div>
    </main>
  );
}