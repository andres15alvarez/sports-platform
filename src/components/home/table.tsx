import React from "react";

interface Column {
  key: string;
  label: string;
}

interface BookmakerOdds {
  match: string;
  driver?: string;
  leagueLogo: string;
  leagueName: string;
  odds: string;
  greenOddsIndex?: number;
  probability: string;
  prediction: string;
  [key: string]: any;
}

interface TableProps {
  bookmakerOdds: BookmakerOdds[];
  columns: Column[];
  title: string;
}

export const Table: React.FC<TableProps> = ({ bookmakerOdds, columns, title }) => {
  return (
    <div className="mt-4 pt-3 border-t border-gray-200">
      <h3 className="text-base lg:text-lg font-semibold mb-2">{title}</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-sm text-black bg-green-50 border-b-2 border-green-600 text-left">
              {columns.map((col, index) => (
                <th key={index} className="py-2 px-3 text-sm ms-2">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            {bookmakerOdds.map((odds, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-green-50">
                {columns.map((col, i) => (
                  <td key={i} className="py-2 px-3 text-center">
                    {col.key === "match" || col.key === "driver" ? (
                      <div className="flex items-center">
                        <img
                          src={odds.leagueLogo}
                          alt={odds.leagueName}
                          className="w-5 h-5 mr-2"
                        />
                        <a
                          href={`/prediction/${odds.match.toLowerCase().replace(/ - /g, "-").replace(/\s/g, "")}`}
                          className="hover:text-green-600 text-[11px] whitespace-nowrap lg:whitespace-normal"
                        >
                          {odds.match}
                        </a>
                        <span className="lg:inline-block text-xs hidden bg-gray-300 text-gray-700 px-1 rounded ml-2">
                          {odds.leagueName}
                        </span>
                      </div>
                    ) : col.key === "odds" ? (
                      <div className="flex justify-center gap-2">
                        {odds.odds.split(" ").filter(Boolean).map((val: string, idx: number) => {
                          let textColor = '';
                          if (idx === odds.greenOddsIndex) textColor = 'text-green-600 font-semibold';
                          return (
                            <span key={idx} className={`${textColor} font-medium`}>
                              {val}
                            </span>
                          );
                        })}
                      </div>
                    ) : col.key === "probability" ? (
                      <div className="flex justify-center gap-2">
                        {odds.probability.split(" ").filter(Boolean).map((val: string, idx: number) => (
                          <span key={idx}>{val}</span>
                        ))}
                      </div>
                    ) : col.key === "prediction" ? (
                      <span
                        className={`px-2 py-1 rounded 
                          ${["1", "Winner", "Pole", "Podium", "Win"].includes(odds.prediction) ? 'bg-green-100 text-green-800' : ''} 
                          ${odds.prediction === "X" ? 'bg-yellow-100 text-yellow-800' : ''} 
                          ${odds.prediction === "2" ? 'bg-red-100 text-red-800' : ''} font-semibold`}
                      >
                        {odds.prediction}
                      </span>
                    ) : (
                      odds[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
