'use client';

import { GameState } from '@/lib/game';

interface ControlButtonsProps {
  gameState: GameState;
  onReset: () => void;
  onUndo: () => void;
}

export default function ControlButtons({ gameState, onReset, onUndo }: ControlButtonsProps) {
  const canUndo = gameState.moveHistory.length > 0 && gameState.status === 'playing';

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={onReset}
        className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
      >
        🎮 New Game
      </button>
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 ${
          canUndo
            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105 hover:shadow-lg'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        ↩️ Undo Move
      </button>
    </div>
  );
}
