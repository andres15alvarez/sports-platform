'use client';

import React from 'react';

type ExpertPredictionProps = {
  title: string;
  prediction: string;
  tag: string;
  odds: string;
};

const ExpertPrediction: React.FC<ExpertPredictionProps> = ({
  title,
  prediction,
  tag,
  odds,
}) => {
  return (
    <div className="border-2 border-green-600 text-black rounded-lg p-4 mb-6">
      <h2 className="text-lg font-bold text-green-800 mb-2 flex items-center">
        <i className="bx bx-trophy mr-2 text-yellow-500"></i>
        {title}
      </h2>

      <p className="font-medium mb-2">{prediction}</p>

      <div className="flex items-center">
        <div className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium flex items-center">
          <i className="bx bx-check mr-1"></i>
          {tag}
        </div>
        <div className="ml-auto">
          <span className="text-xl font-bold text-green-700">{odds}</span>
          <span className="text-sm text-gray-500 ml-1">Odds</span>
        </div>
      </div>
    </div>
  );
};

export default ExpertPrediction;
