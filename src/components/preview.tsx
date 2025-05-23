import React from 'react';

interface Column {
  key: keyof TeamRow;
  label: string;
  bold?: boolean;
}

interface TeamRow {
  rank: number;
  name: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  gf: number;
  ga: number;
  gd: string;
  pts: number;
  highlight: boolean;
}

interface InfoItem {
  label: string;
  value: string | number;
}

interface PreviewSectionProps {
  content: string[];
  keyFactors: string[];
  matchInfo: InfoItem[][];
  tableData: TeamRow[];
  columns: Column[];
  titleOne?: string;
  titleTwo?: string;
  titleThree?: string;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  content,
  keyFactors,
  matchInfo,
  tableData,
  columns,
  titleOne = 'Key Match Factors',
  titleTwo = 'Match Information',
  titleThree = 'Current La Liga Standings',
}) => {
  return (
    <section id="match-preview" className="mb-8 text-black">
      <h2 className="text-xl font-bold text-green-800 border-b border-gray-200 pb-2 mb-4">
        Match Preview
      </h2>

      <div className="grid grid-cols-1  gap-6 mb-4">
        <div className="space-y-4">
          {content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <KeyMatchFactors keyFactors={keyFactors} titleOne={titleOne} />
      </div>

      <MatchInfo info={matchInfo} titleTwo={titleTwo} />
      <LeagueTable data={tableData} titleThree={titleThree} columns={columns} />
    </section>
  );
};

interface KeyMatchFactorsProps {
  keyFactors: string[];
  titleOne: string;
}

const KeyMatchFactors: React.FC<KeyMatchFactorsProps> = ({
  keyFactors,
  titleOne,
}) => (
  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
    <h3 className="font-bold text-blue-800 mb-2">{titleOne}</h3>
    <ul className="list-disc pl-4 space-y-2 text-sm">
      {keyFactors.map((factor, index) => (
        <li key={index}>{factor}</li>
      ))}
    </ul>
  </div>
);

interface MatchInfoProps {
  info: InfoItem[][];
  titleTwo: string;
}

const MatchInfo: React.FC<MatchInfoProps> = ({ info, titleTwo }) => (
  <div className="bg-gray-50 p-4 rounded-lg mb-4">
    <h3 className="font-bold text-lg mb-3">{titleTwo}</h3>
    <div className="grid grid-cols-2 gap-4 text-sm">
      {info.map((col, idx) => (
        <div key={idx}>
          {col.map((item, index) => (
            <p className="flex justify-between mb-2" key={index}>
              <span className="font-medium text-gray-700">{item.label}:</span>
              <span>{item.value}</span>
            </p>
          ))}
        </div>
      ))}
    </div>
  </div>
);

interface LeagueTableProps {
  data: TeamRow[];
  titleThree: string;
  columns: Column[];
}

const LeagueTable: React.FC<LeagueTableProps> = ({
  data,
  titleThree,
  columns,
}) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-bold text-lg mb-3">{titleThree}</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-green-600 text-white text-left">
            {columns.map((col) => (
              <th key={col.key} className="py-2 px-3 text-sm text-center">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {data.map((team, index) => (
            <tr
              key={index}
              className={`border-b ${team.highlight ? 'bg-green-50' : ''}`}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`py-2 px-3 text-center ${
                    col.bold
                      ? 'font-bold'
                      : col.key === 'name'
                        ? 'font-medium text-left'
                        : ''
                  }`}
                >
                  {team[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default PreviewSection;
