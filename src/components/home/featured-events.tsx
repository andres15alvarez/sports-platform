'use client';

import Link from 'next/link';
import React from 'react';

// Tipos definidos para mejor claridad y seguridad
type Odd = {
    label: string;
    value: string;
};

type Event = {
    league: string;
    dateTime: string;
    matchHref: string;
    matchTitle: string;
    odds: Odd[];
};

const events: Event[] = [
    {
        league: 'Serie A',
        dateTime: '04/28/2025 - 20:45',
        matchHref: '/football/serie-a/inter-milan',
        matchTitle: 'Inter vs Milan',
        odds: [
            { label: '1', value: '2.10' },
            { label: 'X', value: '3.25' },
            { label: '2', value: '3.60' }
        ]
    },
    {
        league: 'Premier League',
        dateTime: '04/27/2025 - 17:30',
        matchHref: '/football/premier-league/liverpool-manchester-city',
        matchTitle: 'Liverpool vs Manchester City',
        odds: [
            { label: '1', value: '2.45' },
            { label: 'X', value: '3.40' },
            { label: '2', value: '2.90' }
        ]
    }
];

const FeaturedEvents: React.FC = () => {
    return (
        <section className="my-6">
            <h2 className="text-lg lg:text-xl font-semibold text-green-700 mb-3">
                Featured Sports Events <span className="hidden lg:inline-block">[Sport-api.io]</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((event, index) => (
                    <FeaturedEventCard key={index} {...event} />
                ))}
            </div>
            <div className="text-center mt-4">
                <Link href="/today-events">
                    <p className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium cursor-pointer">
                        View all of today's events
                    </p>
                </Link>
            </div>
        </section>
    );
};

const FeaturedEventCard: React.FC<Event> = ({ league, dateTime, matchHref, matchTitle, odds }) => {
    return (
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{league}</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">{dateTime}</span>
            </div>
            <h3 className="font-bold text-lg mb-2">
                <Link href={matchHref}>
                    <p className="hover:text-green-600 cursor-pointer">{matchTitle}</p>
                </Link>
            </h3>
            <div className="flex justify-between">
                {odds.map((odd, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <span className="text-xs">{odd.label}</span>
                        <span className="font-semibold">{odd.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedEvents;
