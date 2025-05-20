import Link from 'next/link';
import Carousel from './carousel';

export default function RightSidebar() {
  const offers = [
    {
      name: 'Bet365',
      bonus: '€100 Bonus',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Bet365_Logo.svg/442px-Bet365_Logo.svg.png',
      link: 'https://affiliate.bet365.com/?aff=123',
      odds: '1.85',
    },
    {
      name: 'William Hill',
      bonus: '€120 Bonus',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/William_Hill_logo.png/250px-William_Hill_logo.png',
      link: 'https://affiliate.williamhill.com/?aff=456',
      odds: '2.10',
    },
    {
      name: 'Unibet',
      bonus: '€80 Bonus',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Unibet-Logo-white.jpg/250px-Unibet-Logo-white.jpg',
      link: 'https://affiliate.unibet.com/?aff=789',
      odds: '1.95',
    },
    {
      name: 'Pinnacle',
      bonus: '€90 Bonus',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Pinnacle_Logo.jpeg/250px-Pinnacle_Logo.jpeg',
      link: 'https://affiliate.pinnacle.com/?aff=321',
      odds: '2.00',
    },
    {
      name: 'Betway',
      bonus: '€75 Bonus',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Betway_Logo_%28black%29.svg/512px-Betway_Logo_%28black%29.svg.png',
      link: 'https://affiliate.betway.com/?aff=654',
      odds: '1.90',
    },
  ];

  const predictions = [
    { id: 1, text: 'Manchester United vs Chelsea: Both Teams to Score' },
    { id: 2, text: 'Real Madrid vs Barcelona: Over 3.5 Goals' },
    { id: 3, text: 'Juventus vs AC Milan: Juventus Win' },
    { id: 4, text: 'Bayern Munich vs Dortmund: Both Teams to Score' },
    { id: 5, text: 'Paris Saint-Germain vs Lyon: Over 2.5 Goals' },
  ];
  return (
    <aside
      className="w-64 bg-white h-full p-4 rounded-lg shadow"
      aria-label="Bookmaker offers and predictions"
    >
      <h2 className="text-green-700 font-semibold mb-6">Most Visited Events</h2>

      <Carousel />

      {/* Top Bookmaker Offers */}
      <div className="mt-6 space-y-4">
        <h2 className="text-green-700 font-semibold">Top Bookmaker Offers</h2>
        <div className="space-y-2 text-black ">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-green-100 hover:bg-green-200 transition-colors duration-300 px-4 py-2 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={offer.logo}
                  alt={offer.name}
                  className="h-8 w-auto object-contain"
                  loading="lazy"
                />
                <span className="text-sm font-bold">{offer.bonus}</span>
              </div>
              <a
                href={offer.link}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-green-600 font-semibold hover:underline"
              >
                {offer.odds}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="text-green-700 font-semibold mb-2">
            Latest Predictions
          </h2>
          <ul className="space-y-1 text-black">
            {predictions.map((prediction) => (
              <li key={prediction.id}>
                <Link
                  href={`/prediction/${prediction.id}`}
                  className="block hover:bg-green-50 transition-colors rounded px-3 py-2"
                >
                  {prediction.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
