import React from 'react';
import Link from 'next/link';
import Info from '../common/publication-info';

const Hero: React.FC = () =>
  React.createElement(
    React.Fragment,
    null,
    React.createElement(MatchHeader, null),
    React.createElement(
      'div',
      { className: 'bg-gray-50 rounded-xl p-4 md:p-6 mb-8 shadow-sm' },
      React.createElement(HeroImageOverlay, null),
      React.createElement(
        'div',
        { className: 'hidden md:grid grid-cols-7 items-center gap-4' },
        React.createElement(
          'div',
          { className: 'col-span-3' },
          React.createElement(TeamCard, {
            name: 'FC Barcelona',
            image:
              'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
            position: '2nd',
            points: 73,
            link: '/team/barcelona',
            color: 'text-blue-800',
          }),
        ),
        React.createElement(MatchInfoCard, null),
        React.createElement(
          'div',
          { className: 'col-span-3' },
          React.createElement(TeamCard, {
            name: 'Real Madrid',
            image:
              'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
            position: '1st',
            points: 78,
            link: '/team/real-madrid',
            color: 'text-purple-800',
          }),
        ),
      ),
      React.createElement(BookmakerTable, null),
      React.createElement(
        'div',
        { className: 'mt-4 border-t border-gray-200 pt-4 hidden lg:block' },
        React.createElement(
          'div',
          { className: 'grid grid-cols-2 gap-4' },
          React.createElement(RecentForm, {
            teamName: 'Barcelona',
            form: ['W', 'W', 'D', 'W', 'L'],
          }),
          React.createElement(RecentForm, {
            teamName: 'Real Madrid',
            form: ['W', 'W', 'W', 'D', 'W'],
          }),
        ),
      ),
    ),
  );

const MatchHeader: React.FC = () =>
  React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'h1',
      {
        className:
          'text-2xl md:text-3xl font-bold mb-2 hidden lg:block text-black text-center md:text-left',
      },
      'Barcelona FC vs Real Madrid: In-depth Match Analysis and Predictions',
    ),
    React.createElement(Info, null),
  );

const HeroImageOverlay: React.FC = () =>
  React.createElement(
    'div',
    { className: 'relative hidden lg:block rounded-xl overflow-hidden mb-6' },
    React.createElement('img', {
      src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'El Clásico: Barcelona vs Real Madrid',
      className: 'w-full h-48 object-cover opacity-60',
      loading: 'lazy',
    }),
    React.createElement('div', {
      className:
        'absolute inset-0 bg-gradient-to-r from-blue-900 to-red-900 opacity-70',
    }),
    React.createElement(
      'div',
      {
        className:
          'absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-4 text-center',
      },
      React.createElement(
        Link,
        {
          href: '/football/la-liga',
          className:
            'bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium inline-block mb-3',
        },
        React.createElement('i', { className: 'bx bx-trophy mr-1' }),
        'La Liga - Matchday 35',
      ),
      React.createElement(
        'h2',
        { className: 'text-2xl md:text-3xl font-bold mb-2 text-white' },
        'El Clásico',
      ),
      React.createElement(
        'div',
        {
          className:
            'bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium inline-block',
        },
        'Match starts in: 3 days, 7 hours, 32 minutes',
      ),
    ),
  );

type TeamCardProps = {
  name: string;
  image: string;
  position: string;
  points: number;
  link: string;
  color: string;
};

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  image,
  position,
  points,
  link,
  color,
}) =>
  React.createElement(
    Link,
    { href: link, className: 'block text-center' },
    React.createElement('img', {
      src: image,
      alt: name,
      className: 'h-24 mx-auto mb-3',
      loading: 'lazy',
    }),
    React.createElement(
      'h3',
      { className: `text-xl font-bold ${color}` },
      name,
    ),
    React.createElement(
      'p',
      { className: 'text-sm text-gray-600' },
      `Position: ${position} (${points} pts)`,
    ),
  );

const MatchInfoCard: React.FC = () =>
  React.createElement(
    'div',
    { className: 'col-span-1 text-center py-4' },
    React.createElement(
      'div',
      {
        className: 'bg-gray-200 rounded-lg p-4 flex flex-col items-center',
      },
      React.createElement(
        'div',
        { className: 'text-sm text-gray-600 mb-2' },
        'May 4, 2025',
      ),
      React.createElement(
        'div',
        { className: 'text-sm text-gray-600 mb-3' },
        '20:45 CET',
      ),
      React.createElement(
        'div',
        { className: 'text-3xl font-bold mb-2' },
        React.createElement(
          'span',
          {
            className:
              'match-score bg-green-100 text-green-800 px-2 py-1 rounded',
          },
          '2 - 1',
        ),
      ),
      React.createElement(
        'div',
        {
          className: 'text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded',
        },
        'Full Time',
      ),
    ),
    React.createElement(
      'div',
      { className: 'mt-2 text-center' },
      React.createElement(
        'span',
        { className: 'text-xs text-gray-500' },
        'Venue: ',
      ),
      React.createElement(
        'span',
        { className: 'text-sm font-medium text-black' },
        'Camp Nou',
      ),
    ),
  );

type RecentFormProps = {
  teamName: string;
  form: Array<'W' | 'D' | 'L'>;
};

const RecentForm: React.FC<RecentFormProps> = ({ teamName, form }) =>
  React.createElement(
    'div',
    null,
    React.createElement(
      'h4',
      { className: 'font-semibold text-gray-700 mb-2' },
      `${teamName} Recent Form (Last 5)`,
    ),
    React.createElement(
      'div',
      { className: 'flex space-x-1' },
      form.map((result, i) => {
        const bgColor = {
          W: 'bg-green-500 text-white',
          D: 'bg-gray-300 text-gray-700',
          L: 'bg-red-500 text-white',
        }[result];
        return React.createElement(
          'span',
          {
            key: i,
            className: `w-8 h-8 rounded-full flex items-center justify-center font-bold ${bgColor}`,
          },
          result,
        );
      }),
    ),
  );

const BookmakerTable: React.FC = () =>
  React.createElement(
    'div',
    { className: 'mt-6 hidden md:block' },
    React.createElement(
      'h4',
      { className: 'font-semibold text-gray-700 mb-3' },
      'Bookmaker Comparison',
    ),
    React.createElement(
      'div',
      { className: 'overflow-x-auto' },
      React.createElement(
        'table',
        { className: 'min-w-full bg-white border border-gray-200 rounded-lg' },
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              {
                className:
                  'py-3 px-4 bg-gray-100 font-semibold text-left text-gray-700 border-b',
              },
              'Bookmaker',
            ),
            React.createElement(
              'th',
              {
                className:
                  'py-3 px-4 bg-gray-100 font-semibold text-center text-blue-700 border-b',
              },
              'Barcelona Win (1)',
            ),
            React.createElement(
              'th',
              {
                className:
                  'py-3 px-4 bg-gray-100 font-semibold text-center text-gray-700 border-b',
              },
              'Draw (X)',
            ),
            React.createElement(
              'th',
              {
                className:
                  'py-3 px-4 bg-gray-100 font-semibold text-center text-purple-700 border-b',
              },
              'Real Madrid Win (2)',
            ),
            React.createElement(
              'th',
              {
                className:
                  'py-3 px-4 bg-gray-100 font-semibold text-center text-gray-700 border-b',
              },
              'Best Odds',
            ),
          ),
        ),
        React.createElement(
          'tbody',
          null,
          [
            {
              name: 'Bet365',
              logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Bet365_Logo.svg/442px-Bet365_Logo.svg.png',
              odds: { win: 2.15, draw: 3.5, loss: 3.25 },
              redirect: '/redirect/bet365/barcelona-real-madrid',
            },
            {
              name: 'William Hill',
              logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/William_Hill_logo.png/250px-William_Hill_logo.png',
              odds: { win: 2.1, draw: 3.6, loss: 3.3 },
              redirect: '/redirect/william-hill/barcelona-real-madrid',
            },
            {
              name: 'Unibet',
              logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Unibet-Logo-white.jpg/250px-Unibet-Logo-white.jpg',
              odds: { win: 2.2, draw: 3.45, loss: 3.2 },
              redirect: '/redirect/unibet/barcelona-real-madrid',
            },
          ].map(({ name, logo, odds, redirect }, i) =>
            React.createElement(
              'tr',
              { key: i, className: 'text-black' },
              React.createElement(
                'td',
                { className: 'py-3 px-4 border-b' },
                React.createElement(
                  'div',
                  { className: 'flex items-center' },
                  React.createElement('img', {
                    src: logo,
                    alt: name,
                    className: 'h-6 mr-2',
                    loading: 'lazy',
                  }),
                  React.createElement('span', null, name),
                ),
              ),
              React.createElement(
                'td',
                { className: 'py-3 px-4 border-b text-center font-medium' },
                odds.win.toFixed(2),
              ),
              React.createElement(
                'td',
                { className: 'py-3 px-4 border-b text-center font-medium' },
                odds.draw.toFixed(2),
              ),
              React.createElement(
                'td',
                { className: 'py-3 px-4 border-b text-center font-medium' },
                odds.loss.toFixed(2),
              ),
              React.createElement(
                'td',
                { className: 'py-3 px-4 border-b text-center' },
                React.createElement(
                  'a',
                  {
                    href: redirect,
                    className:
                      'bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium',
                  },
                  'Bet Now',
                ),
              ),
            ),
          ),
          React.createElement(
            'tr',
            { className: 'text-black' },
            React.createElement(
              'td',
              { className: 'py-3 px-4 font-semibold' },
              'Best Odds',
            ),
            React.createElement(
              'td',
              {
                className: 'py-3 px-4 text-center font-semibold text-green-600',
              },
              '2.20',
            ),
            React.createElement(
              'td',
              {
                className: 'py-3 px-4 text-center font-semibold text-green-600',
              },
              '3.60',
            ),
            React.createElement(
              'td',
              {
                className: 'py-3 px-4 text-center font-semibold text-green-600',
              },
              '3.30',
            ),
            React.createElement(
              'td',
              { className: 'py-3 px-4 text-center' },
              React.createElement(
                'a',
                {
                  href: '/best-odds/barcelona-real-madrid',
                  className:
                    'text-green-600 hover:underline text-sm font-medium',
                },
                'View All',
              ),
            ),
          ),
        ),
      ),
    ),
  );

export default Hero;
