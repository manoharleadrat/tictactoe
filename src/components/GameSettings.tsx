'use client';

import { GameMode, Difficulty } from '@/lib/game';

interface GameSettingsProps {
  gameMode: GameMode;
  difficulty: Difficulty;
  onGameModeChange: (mode: GameMode) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

export default function GameSettings({ 
  gameMode, 
  difficulty, 
  onGameModeChange, 
  onDifficultyChange 
}: GameSettingsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6 border-2 border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Game Settings</h3>
      
      {/* Game Mode Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">Game Mode</label>
        <div className="flex gap-2">
          <button
            onClick={() => onGameModeChange('human-vs-human')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              gameMode === 'human-vs-human'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            👥 Human vs Human
          </button>
          <button
            onClick={() => onGameModeChange('human-vs-ai')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              gameMode === 'human-vs-ai'
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            🤖 Human vs AI
          </button>
        </div>
      </div>

      {/* Difficulty Selection (only show for AI mode) */}
      {gameMode === 'human-vs-ai' && (
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">AI Difficulty</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onDifficultyChange('easy')}
              className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                difficulty === 'easy'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              😊 Easy
            </button>
            <button
              onClick={() => onDifficultyChange('medium')}
              className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                difficulty === 'medium'
                  ? 'bg-yellow-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              🤔 Medium
            </button>
            <button
              onClick={() => onDifficultyChange('hard')}
              className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                difficulty === 'hard'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              😈 Hard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
