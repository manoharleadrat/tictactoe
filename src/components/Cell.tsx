'use client';

import { CellValue } from '@/lib/game';

interface CellProps {
  value: CellValue;
  index: number;
  onClick: (index: number) => void;
  isWinning?: boolean;
  disabled?: boolean;
}

export default function Cell({ value, index, onClick, isWinning = false, disabled = false }: CellProps) {
  const handleClick = () => {
    if (!disabled && value === null) {
      onClick(index);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        w-full h-full min-h-[80px] md:min-h-[100px] lg:min-h-[120px]
        flex items-center justify-center
        text-3xl md:text-4xl lg:text-5xl font-bold
        rounded-lg transition-all duration-300 ease-in-out
        hover:scale-105 active:scale-95
        ${value === 'X' ? 'text-red-500' : value === 'O' ? 'text-blue-500' : 'text-gray-400'}
        ${isWinning ? 'bg-yellow-100 animate-pulse' : 'bg-white hover:bg-gray-50'}
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        shadow-md hover:shadow-lg
        border-2 border-gray-200 hover:border-gray-300
      `}
    >
      {value}
    </button>
  );
}
