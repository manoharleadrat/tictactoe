'use client';

import { GameState } from '@/lib/game';

interface GameInfoProps {
  gameState: GameState;
}

export default function GameInfo({ gameState }: GameInfoProps) {
  const getStatusMessage = () => {
    if (gameState.isAiThinking) {
      return "🤖 AI is thinking...";
    }

    switch (gameState.status) {
      case 'won':
        if (gameState.gameMode === 'human-vs-ai') {
          return gameState.winner === 'X' ? "🎉 You win!" : "😔 AI wins!";
        }
        return `🎉 Player ${gameState.winner} wins!`;
      case 'draw':
        return "🤝 It's a draw!";
      default:
        if (gameState.gameMode === 'human-vs-ai') {
          return gameState.currentPlayer === 'X' ? "👤 Your turn" : "🤖 AI's turn";
        }
        return `Player ${gameState.currentPlayer}'s turn`;
    }
  };

  const getStatusColor = () => {
    if (gameState.isAiThinking) {
      return 'text-purple-600';
    }

    switch (gameState.status) {
      case 'won':
        if (gameState.gameMode === 'human-vs-ai') {
          return gameState.winner === 'X' ? 'text-green-600' : 'text-red-600';
        }
        return 'text-green-600';
      case 'draw':
        return 'text-yellow-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="text-center space-y-2">
      <div className={`text-lg md:text-xl font-semibold ${getStatusColor()}`}>
        {getStatusMessage()}
      </div>
      {gameState.status === 'playing' && (
        <div className="text-sm text-gray-600">
          Click on any empty cell to make your move
        </div>
      )}
    </div>
  );
}
