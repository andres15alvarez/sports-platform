import React from 'react';

const MatchOverview = (): React.ReactElement => {
  const teamStats = [
    {
      name: 'FC Barcelona',
      border: 'border-l-4 border-blue-500',
      textColor: 'text-blue-800',
      stats: {
        position: '2nd',
        points: '73',
        form: 'W W D W L',
        scored: '62',
        conceded: '28',
      },
    },
    {
      name: 'Real Madrid',
      border: 'border-r-4 border-purple-500',
      textColor: 'text-purple-800',
      stats: {
        position: '1st',
        points: '78',
        form: 'W W W D W',
        scored: '68',
        conceded: '23',
      },
    },
  ];

  const statsList = (stats: Record<string, string>): React.ReactElement =>
    React.createElement(
      'ul',
      { className: 'space-y-1 text-sm' },
      Object.entries(stats).map(([label, value]) =>
        React.createElement(
          'li',
          { className: 'flex justify-between', key: label },
          [
            React.createElement('span', null, formatLabel(label)),
            React.createElement('span', { className: 'font-medium' }, value),
          ],
        ),
      ),
    );

  const formatLabel = (key: string): string => {
    switch (key) {
      case 'position':
        return 'Current Position:';
      case 'points':
        return 'Points:';
      case 'form':
        return 'Form (Last 5):';
      case 'scored':
        return 'Goals Scored:';
      case 'conceded':
        return 'Goals Conceded:';
      default:
        return key;
    }
  };

  return React.createElement(
    'div',
    {
      className:
        'bg-gray-50 rounded-xl text-black p-6 mb-8 shadow-sm hidden lg:block',
    },
    [
      React.createElement(
        'h2',
        { className: 'text-xl font-bold text-black mb-4', key: 'title' },
        'Match Overview',
      ),
      React.createElement(
        'div',
        { className: 'grid grid-cols-3 gap-4', key: 'grid' },
        [
          // FC Barcelona Stats
          React.createElement(
            'div',
            {
              className: `bg-white p-4 rounded-lg shadow-sm ${teamStats[0].border}`,
              key: 'barcelona',
            },
            [
              React.createElement(
                'h3',
                {
                  className: `font-semibold ${teamStats[0].textColor} mb-2`,
                  key: 'barca-title',
                },
                teamStats[0].name,
              ),
              statsList(teamStats[0].stats),
            ],
          ),

          // Match Info Center
          React.createElement(
            'div',
            {
              className: 'bg-white p-4 rounded-lg shadow-sm',
              key: 'match-info',
            },
            [
              React.createElement(
                'div',
                { className: 'text-center mb-2', key: 'matchday' },
                React.createElement(
                  'span',
                  {
                    className:
                      'inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium',
                  },
                  'La Liga - Matchday 35',
                ),
              ),
              React.createElement(
                'div',
                {
                  className: 'flex justify-between items-center mb-4',
                  key: 'teams',
                },
                [
                  React.createElement(
                    'div',
                    { className: 'text-center', key: 'team1' },
                    React.createElement(
                      'span',
                      {
                        className: 'text-gray-700 text-lg font-medium',
                      },
                      'Barcelona',
                    ),
                  ),
                  React.createElement(
                    'div',
                    {
                      className: 'text-center text-2xl font-bold',
                      key: 'vs',
                    },
                    React.createElement('span', null, 'VS'),
                  ),
                  React.createElement(
                    'div',
                    { className: 'text-center', key: 'team2' },
                    React.createElement(
                      'span',
                      {
                        className: 'text-gray-700 text-lg font-medium',
                      },
                      'Real Madrid',
                    ),
                  ),
                ],
              ),
              React.createElement(
                'div',
                {
                  className: 'flex justify-between items-center mb-2',
                  key: 'odds',
                },
                [
                  React.createElement(
                    'div',
                    {
                      className:
                        'text-center text-2xl font-semibold text-blue-600',
                      key: 'home-odds',
                    },
                    '2.15',
                  ),
                  React.createElement(
                    'div',
                    {
                      className:
                        'text-center text-xl font-semibold text-gray-600',
                      key: 'draw-odds',
                    },
                    '3.50',
                  ),
                  React.createElement(
                    'div',
                    {
                      className:
                        'text-center text-2xl font-semibold text-white bg-blue-600 rounded-md px-2',
                      key: 'away-odds',
                    },
                    '3.25',
                  ),
                ],
              ),
              React.createElement(
                'div',
                {
                  className:
                    'flex justify-between text-xs text-center text-gray-600',
                  key: 'labels',
                },
                [
                  React.createElement('div', null, 'Home Win'),
                  React.createElement('div', null, 'Draw'),
                  React.createElement('div', null, 'Away Win'),
                ],
              ),
            ],
          ),

          // Real Madrid Stats
          React.createElement(
            'div',
            {
              className: `bg-white p-4 rounded-lg shadow-sm ${teamStats[1].border}`,
              key: 'madrid',
            },
            [
              React.createElement(
                'h3',
                {
                  className: `font-semibold ${teamStats[1].textColor} mb-2`,
                },
                teamStats[1].name,
              ),
              statsList(teamStats[1].stats),
            ],
          ),
        ],
      ),
    ],
  );
};

export default MatchOverview;
