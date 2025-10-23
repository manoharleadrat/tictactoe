'use client';

import { CellValue, GameState } from '@/lib/game';
import Cell from './Cell';

interface GameBoardProps {
  gameState: GameState;
  onCellClick: (index: number) => void;
  disabled?: boolean;
  winningPattern?: number[] | null;
}

export default function GameBoard({ gameState, onCellClick, disabled = false, winningPattern = null }: GameBoardProps) {

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3 bg-gray-800 p-2 md:p-3 rounded-xl shadow-2xl">
      {gameState.board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          index={index}
          onClick={onCellClick}
          isWinning={winningPattern?.includes(index)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
