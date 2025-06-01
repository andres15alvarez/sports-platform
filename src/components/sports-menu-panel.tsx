'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SportsMenuPanel = ({ isOpen }: { isOpen: boolean }) => {
  const [expanded, setExpanded] = useState('');

  const toggleSubmenu = (menuId: string) => {
    setExpanded(expanded === menuId ? '' : menuId);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed left-0 bottom-[60px] w-full bg-[#065f46] z-[49] max-h-[70vh] overflow-y-auto transition-transform duration-300 ease-in-out rounded-t-2xl p-4 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white border-b border-yellow-400 pb-2 mb-3">
          Popular Leagues
        </h2>
        <ul className="space-y-3 text-white">
          <li className="flex items-center space-x-2 hover:text-yellow-300">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Serie_A_logo_2022.svg"
              width={20}
              height={20}
              alt="Serie A"
            />
            <Link href="#">Serie A</Link>
          </li>
          <li className="flex items-center space-x-2 hover:text-yellow-300">
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/280px-Premier_League_Logo.svg.png"
              width={20}
              height={20}
              alt="Premier League"
            />
            <Link href="#">Premier League</Link>
          </li>
          <li className="flex items-center space-x-2 hover:text-yellow-300">
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/UEFA_Champions_League.svg/240px-UEFA_Champions_League.svg.png"
              width={20}
              height={20}
              alt="Champions League"
            />
            <Link href="#">Champions League</Link>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white border-b border-yellow-400 pb-2 mb-3">
          All Sports
        </h2>
        {[
          {
            id: 'football',
            icon: 'bx-football',
            label: 'Football',
            links: [
              {
                href: '#',
                label: 'Premier League',
                icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/280px-Premier_League_Logo.svg.png',
              },
              {
                href: '#',
                label: 'Serie A',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Serie_A_logo_2022.svg',
              },
              {
                href: '#',
                label: 'La Liga',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/LaLiga_EA_Sports_2023_Vertical_Logo.svg/250px-LaLiga_EA_Sports_2023_Vertical_Logo.svg.png',
              },
            ],
          },
          {
            id: 'tennis',
            icon: 'bx-tennis-ball',
            label: 'Tennis',
            links: [
              {
                href: '#',
                label: 'ATP Tour',
                icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/ATP_Tour_logo.svg/250px-ATP_Tour_logo.svg.png',
              },
              {
                href: '#',
                label: 'WTA Tour',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/WTA_logo_2010.svg/408px-WTA_logo_2010.svg.png',
              },
            ],
          },
          {
            id: 'basketball',
            icon: 'bx-basketball',
            label: 'Basketball',
            links: [
              {
                href: '#',
                label: 'NBA',
                icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/National_Basketball_Association_logo.svg/120px-National_Basketball_Association_logo.svg.png',
              },
              {
                href: '#',
                label: 'Euroleague',
                icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Turkish_Airlines_EuroLeague.svg/330px-Turkish_Airlines_EuroLeague.svg.png',
              },
            ],
          },
          {
            id: 'f1',
            icon: 'bx-car',
            label: 'Formula 1',
            links: [
              {
                href: '#',
                label: 'Grand Prix',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/F1_%28registered_trademark%29.svg/120px-F1_%28registered_trademark%29.svg.png',
              },
              {
                href: '#',
                label: 'Drivers',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/F1_%28registered_trademark%29.svg/120px-F1_%28registered_trademark%29.svg.png',
              },
            ],
          },
        ].map((sport) => (
          <div key={sport.id}>
            <button
              onClick={() => toggleSubmenu(sport.id)}
              className="w-full flex justify-between items-center text-white font-semibold"
            >
              <span className="flex items-center space-x-2">
                <i className={`bx ${sport.icon} text-xl`} />
                <span>{sport.label}</span>
              </span>
              <i
                className={`bx ${expanded === sport.id ? 'bx-chevron-up' : 'bx-chevron-down'}`}
              />
            </button>
            {expanded === sport.id && (
              <ul className="ml-4 mt-2 space-y-2 text-sm text-white">
                {sport.links.map((link) => (
                  <li
                    key={link.label}
                    className="flex items-center space-x-2 hover:text-yellow-300"
                  >
                    <Image
                      src={link.icon}
                      width={16}
                      height={16}
                      alt={link.label}
                    />
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsMenuPanel;
