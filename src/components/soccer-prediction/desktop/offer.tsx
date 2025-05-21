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

const BettingOffers = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Best Betting Offers for El Clásico
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bettingOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mt-4">
        <p className="text-sm text-blue-800 flex items-center">
          <i className="bx bx-info-circle mr-2 text-xl"></i>
          Gambling is forbidden to minors under 18 years of age. Gamble
          responsibly. OddsSite compares odds from ADM (formerly AAMS)
          authorized bookmakers.
        </p>
      </div>
    </section>
  );
};

const OfferCard = ({ offer }: { offer: BettingOffer }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="bg-green-600 text-white p-4">
      <h3 className="font-semibold text-lg">{offer.title}</h3>
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <Image
          src={offer.image}
          alt={offer.alt}
          width={offer.width}
          height={32}
          className="h-8 w-auto"
        />
        <Link
          href={offer.link}
          className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-md font-medium inline-block transition-colors"
          rel="nofollow"
        >
          Claim Offer
        </Link>
      </div>
      <p className="text-sm text-gray-600">{offer.description}</p>
    </div>
  </div>
);

export default BettingOffers;
