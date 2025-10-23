'use client';

import { Score } from '@/lib/game';

interface ScoreBoardProps {
  score: Score;
}

export default function ScoreBoard({ score }: ScoreBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4">
      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 text-center">
        <div className="text-sm font-medium text-blue-700 mb-1">Human</div>
        <div className="text-2xl font-bold text-blue-600">{score.human}</div>
      </div>
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3 text-center">
        <div className="text-sm font-medium text-yellow-700 mb-1">Draws</div>
        <div className="text-2xl font-bold text-yellow-600">{score.draws}</div>
      </div>
      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3 text-center">
        <div className="text-sm font-medium text-purple-700 mb-1">AI</div>
        <div className="text-2xl font-bold text-purple-600">{score.ai}</div>
      </div>
    </div>
  );
}
