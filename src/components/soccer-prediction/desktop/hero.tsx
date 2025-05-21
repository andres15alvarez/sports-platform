import React from 'react';
import Link from 'next/link';
import Info from '../common/publication-info';

type TeamCardProps = {
  name: string;
  image: string;
  position: string;
  points: string;
  link: string;
  color: string;
};

type RecentFormProps = {
  teamName: string;
  form: Array<'W' | 'D' | 'L'>;
};

const Hero = () => (
  <>
    <MatchHeader />
    <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-8 shadow-sm">
      <HeroImageOverlay />
      <div className="hidden md:grid grid-cols-7 items-center gap-4">
        <div className="col-span-3">
          <TeamCard
            name="FC Barcelona"
            image="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"
            position="2nd"
            points="73"
            link="/team/barcelona"
            color="text-blue-800"
          />
        </div>
        <MatchInfoCard />
        <div className="col-span-3">
          <TeamCard
            name="Real Madrid"
            image="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg"
            position="1st"
            points="78"
            link="/team/real-madrid"
            color="text-purple-800"
          />
        </div>
      </div>
      <BookmakerTable />
      <div className="mt-4 border-t border-gray-200 pt-4 hidden lg:block">
        <div className="grid grid-cols-2 gap-4">
          <RecentForm teamName="Barcelona" form={['W', 'W', 'D', 'W', 'L']} />
          <RecentForm teamName="Real Madrid" form={['W', 'W', 'W', 'D', 'W']} />
        </div>
      </div>
    </div>
  </>
);

const MatchHeader = () => (
  <>
    <h1 className="text-2xl md:text-3xl font-bold mb-2 hidden lg:block text-black text-center md:text-left">
      Barcelona FC vs Real Madrid: In-depth Match Analysis and Predictions
    </h1>
    <Info />
  </>
);

const HeroImageOverlay = () => (
  <div className="relative hidden lg:block rounded-xl overflow-hidden mb-6">
    <img
      src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      alt="El Clásico: Barcelona vs Real Madrid"
      className="w-full h-48 object-cover opacity-60"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-red-900 opacity-70"></div>
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-4 text-center">
      <Link
        href="/football/la-liga"
        className="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium inline-block mb-3"
      >
        <i className="bx bx-trophy mr-1"></i>
        La Liga - Matchday 35
      </Link>
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
        El Clásico
      </h2>
      <div className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium inline-block">
        Match starts in: 3 days, 7 hours, 32 minutes
      </div>
    </div>
  </div>
);

const TeamCard = ({
  name,
  image,
  position,
  points,
  link,
  color,
}: TeamCardProps) => (
  <Link href={link} className="block text-center">
    <img src={image} alt={name} className="h-24 mx-auto mb-3" loading="lazy" />
    <h3 className={`text-xl font-bold ${color}`}>{name}</h3>
    <p className="text-sm text-gray-600">
      Position: {position} ({points} pts)
    </p>
  </Link>
);

const MatchInfoCard = () => (
  <div className="col-span-1 text-center py-4">
    <div className="bg-gray-200 rounded-lg p-4 flex flex-col items-center">
      <div className="text-sm text-gray-600 mb-2">May 4, 2025</div>
      <div className="text-sm text-gray-600 mb-3">20:45 CET</div>
      <div className="text-3xl font-bold mb-2">
        <span className="match-score bg-green-100 text-green-800 px-2 py-1 rounded">
          2 - 1
        </span>
      </div>
      <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
        Full Time
      </div>
    </div>
    <div className="mt-2 text-center">
      <span className="text-xs text-gray-500">Venue: </span>
      <span className="text-sm font-medium text-black">Camp Nou</span>
    </div>
  </div>
);

const RecentForm = ({ teamName, form }: RecentFormProps) => (
  <div>
    <h4 className="font-semibold text-gray-700 mb-2">
      {teamName} Recent Form (Last 5)
    </h4>
    <div className="flex space-x-1">
      {form.map((result, i) => {
        const bgColor = {
          W: 'bg-green-500 text-white',
          D: 'bg-gray-300 text-gray-700',
          L: 'bg-red-500 text-white',
        }[result];
        return (
          <span
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${bgColor}`}
          >
            {result}
          </span>
        );
      })}
    </div>
  </div>
);

const BookmakerTable = () => {
  return (
    <div className="mt-6 hidden md:block">
      <h4 className="font-semibold text-gray-700 mb-3">Bookmaker Comparison</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-100 font-semibold text-left text-gray-700 border-b">
                Bookmaker
              </th>
              <th className="py-3 px-4 bg-gray-100 font-semibold text-center text-blue-700 border-b">
                Barcelona Win (1)
              </th>
              <th className="py-3 px-4 bg-gray-100 font-semibold text-center text-gray-700 border-b">
                Draw (X)
              </th>
              <th className="py-3 px-4 bg-gray-100 font-semibold text-center text-purple-700 border-b">
                Real Madrid Win (2)
              </th>
              <th className="py-3 px-4 bg-gray-100 font-semibold text-center text-gray-700 border-b">
                Best Odds
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-black">
              <td className="py-3 px-4 border-b ">
                <div className="flex items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Bet365_Logo.svg/442px-Bet365_Logo.svg.png"
                    alt="Bet365"
                    className="h-6 mr-2"
                    loading="lazy"
                  />
                  <span>Bet365</span>
                </div>
              </td>
              <td className="py-3 px-4 border-b text-center font-medium">
                2.15
              </td>
              <td className="py-3 px-4 border-b text-center font-medium">
                3.50
              </td>
              <td className="py-3 px-4 border-b text-center font-medium">
                3.25
              </td>
              <td className="py-3 px-4 border-b text-center">
                <a
                  href="/redirect/bet365/barcelona-real-madrid"
                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium"
                >
                  Bet Now
                </a>
              </td>
            </tr>
            <tr className="text-black">
              <td className="py-3 px-4 border-b">
                <div className="flex items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/William_Hill_logo.png/250px-William_Hill_logo.png"
                    alt="William Hill"
                    className="h-6 mr-2"
                    loading="lazy"
                  />
                  <span>William Hill</span>
                </div>
              </td>
              <td className="py-3 px-4 border-b text-center font-medium">
                2.10
              </td>
              <td className="py-3 px-4 border-b text-center font-medium">
                3.60
              </td>
              <td className="py-3 px-4 border-b text-center font-medium">
                3.30
              </td>
              <td className="py-3 px-4 border-b text-center">
                <a
                  href="/redirect/william-hill/barcelona-real-madrid"
                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium"
                >
                  Bet Now
                </a>
              </td>
            </tr>
            <tr className="text-black">
              <td className="py-3 px-4 border-b">
                <div className="flex items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Unibet-Logo-white.jpg/250px-Unibet-Logo-white.jpg"
                    alt="Unibet"
                    className="h-6 mr-2"
                    loading="lazy"
                  />
                  <span>Unibet</span>
                </div>
              </td>
              <td className="py-3 px-4 border-b text-center font-medium">
                2.20
              </td>
              <td className="py-3 px-4 border-b text-center font-medium">
                3.45
              </td>
              <td className="py-3 px-4 border-b text-center font-medium">
                3.20
              </td>
              <td className="py-3 px-4 border-b text-center">
                <a
                  href="/redirect/unibet/barcelona-real-madrid"
                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-medium"
                >
                  Bet Now
                </a>
              </td>
            </tr>
            <tr className="text-black">
              <td className="py-3 px-4 font-semibold">Best Odds</td>
              <td className="py-3 px-4 text-center font-semibold text-green-600">
                2.20
              </td>
              <td className="py-3 px-4 text-center font-semibold text-green-600">
                3.60
              </td>
              <td className="py-3 px-4 text-center font-semibold text-green-600">
                3.30
              </td>
              <td className="py-3 px-4 text-center">
                <a
                  href="/best-odds/barcelona-real-madrid"
                  className="text-green-600 hover:underline text-sm font-medium"
                >
                  View All
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hero;
