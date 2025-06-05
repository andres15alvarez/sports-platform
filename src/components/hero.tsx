'use client';

import Image from 'next/image';
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

const Hero = ({ match, children }: HeroProps) => {
  const { title, homeTeam, awayTeam, matchInfo, odds } = match;

  return (
    <>
      <h1 className="text-2xl font-bold mb-2 text-black">{title}</h1>
      {children}

      <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-8 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-sm font-medium text-gray-700">Share:</span>
          {[
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
          ].map((social, idx) => (
            <Link
              key={idx}
              href={social.href}
              aria-label={`Share on ${social.label}`}
              className={`${social.color} ${social.hover}`}
            >
              <i className={`bx ${social.icon} text-xl`}></i>
            </Link>
          ))}
        </div>

        <div className="block">
          <div className="flex items-center justify-between">
            {[homeTeam, matchInfo, awayTeam].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center w-2/5">
                {item.logo && (
                  <Image
                    src={item.logo}
                    alt={`${item.name} logo`}
                    width={64}
                    height={64}
                    className="mb-2"
                    priority={idx === 0}
                  />
                )}
                <h3 className="font-bold text-center text-black">
                  {item.name}
                </h3>
                <div className="flex mt-1">
                  <span
                    className={`${
                      item.rank === '5th in Western Conference'
                        ? 'bg-yellow-100 text-yellow-800'
                        : item.rank === 'NBA Playoffs'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                    } text-xs px-2 py-1 rounded`}
                  >
                    {item.rank}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            {odds.map((odd, idx) => (
              <div
                key={idx}
                className={`w-1/3 text-center ${idx === 1 ? 'mx-2' : ''}`}
              >
                <div className="text-xs text-gray-600 mb-1">{odd.label}</div>
                <div className="bg-white rounded-lg py-2 shadow-sm">
                  <span className="text-lg font-bold text-green-700">
                    {odd.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
