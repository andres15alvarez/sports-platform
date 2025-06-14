import React from 'react';
import { Standing } from '@/src/types/footballStandings';
import { getStatusColor } from '@/src/utils/footballStandings';
import { TeamCell } from './team-cell';
import { FormIndicator } from './form-indicator';

interface StandingsTableRowProps {
  standing: Standing;
  index: number;
}

export const StandingsTableRow: React.FC<StandingsTableRowProps> = ({
  standing,
  index,
}) => (
  <tr
    key={`${standing.team.id}-${index}`}
    className={`border-b border-gray-200 hover:bg-green-50 ${getStatusColor(standing.description)}`}
  >
    <td className="py-2 px-3 text-sm text-gray-600 text-center">
      {standing.rank}
    </td>
    <td className="py-2 px-3 text-sm">
      <TeamCell team={standing.team} />
    </td>
    <td className="py-2 px-3 text-sm text-center text-gray-600">
      {standing.all.played}
    </td>
    <td className="py-2 px-3 text-sm text-center text-gray-600">
      {standing.all.win}
    </td>
    <td className="py-2 px-3 text-sm text-center text-gray-600">
      {standing.all.draw}
    </td>
    <td className="py-2 px-3 text-sm text-center text-gray-600">
      {standing.all.lose}
    </td>
    <td className="py-2 px-3 text-sm text-center text-gray-600">
      {standing.all.goals.for}
    </td>
    <td className="py-2 px-3 text-sm text-center text-gray-600">
      {standing.all.goals.against}
    </td>
    <td className="py-2 px-3 text-sm text-center text-gray-600">
      {standing.goalsDiff > 0 ? '+' : ''}
      {standing.goalsDiff}
    </td>
    <td className="py-2 px-3 text-sm text-center font-semibold text-gray-800">
      {standing.points}
    </td>
    <td className="py-2 px-3 text-sm text-center">
      <FormIndicator form={standing.form} />
    </td>
  </tr>
);
