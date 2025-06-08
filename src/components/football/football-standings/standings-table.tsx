import React from 'react';
import { Standing } from '@/src/types/footballStandings';
import { StandingsTableRow } from './standings-table-row';

interface StandingsTableProps {
  standings: Standing[];
}

export const StandingsTable: React.FC<StandingsTableProps> = ({
  standings,
}) => (
  <div className="mt-4 pt-3 ">
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-sm text-black bg-green-50 border-b-2 border-green-600 text-left">
            <th className="py-2 px-3 text-sm ms-2">Pos</th>
            <th className="py-2 px-3 text-sm">Team</th>
            <th className="py-2 px-3 text-sm text-center">MP</th>
            <th className="py-2 px-3 text-sm text-center">W</th>
            <th className="py-2 px-3 text-sm text-center">D</th>
            <th className="py-2 px-3 text-sm text-center">L</th>
            <th className="py-2 px-3 text-sm text-center">GF</th>
            <th className="py-2 px-3 text-sm text-center">GA</th>
            <th className="py-2 px-3 text-sm text-center">GD</th>
            <th className="py-2 px-3 text-sm text-center">Pts</th>
            <th className="py-2 px-3 text-sm text-center">Form</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {standings.length === 0 ? (
            <tr>
              <td colSpan={11} className="px-3 py-3 text-center text-gray-500">
                No standings data available
              </td>
            </tr>
          ) : (
            standings.map((standing, index) => (
              <StandingsTableRow
                key={`${standing.team.id}-${index}`}
                standing={standing}
                index={index}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);
