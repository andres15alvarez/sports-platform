'use client';

import React from 'react';
import { UnifiedSportCalendar } from '@/src/components/sport-calendar';

const SportsCalendarPage: React.FC = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Sports Calendar</h1>
          <p className="mt-2 text-blue-100">
            View upcoming matches, live games, and results for football,
            basketball, and baseball
          </p>
        </div>
      </div>

      <UnifiedSportCalendar />
    </div>
  );
};

export default SportsCalendarPage;
