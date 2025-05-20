import Link from 'next/link';
import React, { ReactNode } from 'react';

interface TeamInfo {
  name: string;
  logo?: string;
  rank: string;
}

interface MatchInfo {
  name: string;
  logo?: string;
  rank: string;
}

interface Odd {
  label: string;
  value: string;
}

interface MatchData {
  title: string;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  matchInfo: MatchInfo;
  odds: Odd[];
}

interface HeroProps {
  match: MatchData;
  children?: ReactNode;
}

const Hero = ({ match, children }: HeroProps): React.ReactElement => {
  if (!match) {
    return <div className="text-red-600">Match data is missing</div>;
  }

  const { title, homeTeam, awayTeam, matchInfo, odds } = match;

  const socialLinks = [
    {
      href: '#',
      icon: 'bxl-facebook',
      color: 'text-blue-600',
      hover: 'hover:text-blue-800',
      label: 'Facebook',
    },
    {
      href: '#',
      icon: 'bxl-twitter',
      color: 'text-blue-400',
      hover: 'hover:text-blue-600',
      label: 'Twitter',
    },
    {
      href: '#',
      icon: 'bxl-whatsapp',
      color: 'text-green-600',
      hover: 'hover:text-green-800',
      label: 'WhatsApp',
    },
    {
      href: '#',
      icon: 'bxl-telegram',
      color: 'text-blue-700',
      hover: 'hover:text-blue-900',
      label: 'Telegram',
    },
  ];

  return React.createElement(React.Fragment, null, [
    React.createElement(
      'h1',
      { className: 'text-2xl font-bold mb-2 text-black', key: 'title' },
      title,
    ),
    children,
    React.createElement(
      'div',
      {
        className: 'bg-gray-50 rounded-xl p-4 md:p-6 mb-8 shadow-sm',
        key: 'main',
      },
      [
        React.createElement(
          'div',
          { className: 'flex items-center space-x-3 mb-4', key: 'social' },
          [
            React.createElement(
              'span',
              { className: 'text-sm font-medium text-gray-700', key: 'label' },
              'Share:',
            ),
            ...socialLinks.map((social, idx) =>
              React.createElement(
                Link,
                {
                  href: social.href,
                  key: idx,
                  'aria-label': `Share on ${social.label}`,
                  className: `${social.color} ${social.hover}`,
                },
                React.createElement('i', {
                  className: `bx ${social.icon} text-xl`,
                }),
              ),
            ),
          ],
        ),
        React.createElement('div', { className: 'block', key: 'teams' }, [
          React.createElement(
            'div',
            {
              className: 'flex items-center justify-between',
              key: 'teams-wrapper',
            },
            [homeTeam, matchInfo, awayTeam].map((item, idx) =>
              React.createElement(
                'div',
                {
                  className: 'flex flex-col items-center w-2/5',
                  key: `team-${idx}`,
                },
                [
                  item.logo &&
                    React.createElement('img', {
                      src: item.logo,
                      alt: `${item.name} logo`,
                      className: 'w-16 h-16 mb-2',
                      loading: 'lazy',
                      key: `img-${idx}`,
                    }),
                  React.createElement(
                    'h3',
                    {
                      className: 'font-bold text-center text-black',
                      key: `name-${idx}`,
                    },
                    item.name,
                  ),
                  React.createElement(
                    'div',
                    { className: 'flex mt-1', key: `rank-${idx}` },
                    React.createElement(
                      'span',
                      {
                        className: `${
                          item.rank === '5th in Western Conference'
                            ? 'bg-yellow-100 text-yellow-800'
                            : item.rank === 'NBA Playoffs'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                        } text-xs px-2 py-1 rounded`,
                      },
                      item.rank,
                    ),
                  ),
                ],
              ),
            ),
          ),
          React.createElement(
            'div',
            { className: 'mt-4 flex justify-between', key: 'odds' },
            odds.map((odd, idx) =>
              React.createElement(
                'div',
                {
                  className: `w-1/3 text-center ${idx === 1 ? 'mx-2' : ''}`,
                  key: `odd-${idx}`,
                },
                [
                  React.createElement(
                    'div',
                    {
                      className: 'text-xs text-gray-600 mb-1',
                      key: `label-${idx}`,
                    },
                    odd.label,
                  ),
                  React.createElement(
                    'div',
                    {
                      className: 'bg-white rounded-lg py-2 shadow-sm',
                      key: `value-${idx}`,
                    },
                    React.createElement(
                      'span',
                      { className: 'text-lg font-bold text-green-700' },
                      odd.value,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ]),
      ],
    ),
  ]);
};

export default Hero;
