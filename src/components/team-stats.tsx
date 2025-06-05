'use client';

import React from 'react';

type Stats = Record<string, string | number>;

type TeamStatsCardProps = {
  title: string;
  chartId: string;
  stats: Stats;
  chart: React.ReactNode;
};

const TeamStatsCard: React.FC<TeamStatsCardProps> = ({
  title,
  chartId,
  stats,
  chart,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-bold text-lg mb-3">{title}</h3>

      {/* Chart section */}
      <div id={chartId}>{chart}</div>

      {/* Stats */}
      <div className="pt-3 border-t border-gray-200 grid grid-cols-2 gap-1.5 text-sm">
        {Object.entries(stats).map(([label, value], i) => (
          <p key={i} className="flex justify-between">
            <span className="font-medium text-gray-700">{label}:</span>
            <span className="font-semibold">{value}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default TeamStatsCard;
