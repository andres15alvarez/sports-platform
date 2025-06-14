import React from 'react';
import { getFormColor } from '@/src/utils/footballStandings';

interface FormIndicatorProps {
  form: string;
}

export const FormIndicator: React.FC<FormIndicatorProps> = ({ form }) => {
  if (!form) return <span className="text-gray-400">-</span>;

  return (
    <div className="flex justify-center gap-1">
      {form
        .split('')
        .slice(-5)
        .map((result, index) => (
          <div
            key={index}
            className={`w-5 h-5 rounded-full ${getFormColor(result)} flex items-center justify-center text-white text-[10px] font-bold`}
            title={result === 'W' ? 'Win' : result === 'D' ? 'Draw' : 'Loss'}
          >
            {result}
          </div>
        ))}
    </div>
  );
};
