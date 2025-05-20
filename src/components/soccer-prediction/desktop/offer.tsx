import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type BettingOffer = {
  id: number;
  title: string;
  image: string;
  alt: string;
  width: number;
  link: string;
  description: string;
};

const bettingOffers: BettingOffer[] = [
  {
    id: 1,
    title: 'Enhanced Odds: Barcelona to Win @ 5.00',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Bet365_Logo.svg/442px-Bet365_Logo.svg.png',
    alt: 'Bet365',
    width: 100,
    link: '/redirect/bet365',
    description:
      'New customers only. Min deposit €10. Maximum free bet €50. First bet must be placed on odds 1.5 or higher. Terms and conditions apply.',
  },
  {
    id: 2,
    title: '€50 Free Bet on El Clásico',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/William_Hill_logo.png/250px-William_Hill_logo.png',
    alt: 'William Hill',
    width: 130,
    link: '/redirect/william-hill',
    description:
      'Register and place a €10 bet on any El Clásico market to receive a €50 free bet. Minimum odds 1.5. Terms and conditions apply.',
  },
];

const OfferCard = ({ offer }: { offer: BettingOffer }): React.ReactElement =>
  React.createElement(
    'div',
    { className: 'bg-white rounded-lg shadow-sm overflow-hidden' },
    [
      React.createElement(
        'div',
        { className: 'bg-green-600 text-white p-4', key: 'header' },
        React.createElement(
          'h3',
          { className: 'font-semibold text-lg' },
          offer.title,
        ),
      ),
      React.createElement('div', { className: 'p-4', key: 'body' }, [
        React.createElement(
          'div',
          {
            className: 'flex items-center justify-between mb-3',
            key: 'row',
          },
          [
            React.createElement(Image, {
              key: 'image',
              src: offer.image,
              alt: offer.alt,
              width: offer.width,
              height: 32,
              className: 'h-8 w-auto',
            }),
            React.createElement(
              Link,
              {
                href: offer.link,
                className:
                  'bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-md font-medium inline-block transition-colors',
                rel: 'nofollow',
              },
              'Claim Offer',
            ),
          ],
        ),
        React.createElement(
          'p',
          { className: 'text-sm text-gray-600' },
          offer.description,
        ),
      ]),
    ],
  );

const BettingOffers = (): React.ReactElement =>
  React.createElement('section', null, [
    React.createElement(
      'h2',
      { className: 'text-2xl font-bold text-gray-800 mb-4', key: 'title' },
      'Best Betting Offers for El Clásico',
    ),
    React.createElement(
      'div',
      {
        className: 'grid grid-cols-1 md:grid-cols-2 gap-4',
        key: 'offers',
      },
      bettingOffers.map((offer) =>
        React.createElement(OfferCard, { key: offer.id, offer }),
      ),
    ),
    React.createElement(
      'div',
      {
        className: 'bg-blue-50 p-4 rounded-lg mt-4',
        key: 'disclaimer',
      },
      React.createElement(
        'p',
        {
          className: 'text-sm text-blue-800 flex items-center',
        },
        [
          React.createElement('i', {
            className: 'bx bx-info-circle mr-2 text-xl',
            key: 'icon',
          }),
          'Gambling is forbidden to minors under 18 years of age. Gamble responsibly. OddsSite compares odds from ADM (formerly AAMS) authorized bookmakers.',
        ],
      ),
    ),
  ]);

export default BettingOffers;
