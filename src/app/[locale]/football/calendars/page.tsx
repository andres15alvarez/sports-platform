'use client';

import React from 'react';
import SportsCalendarPage from '@/src/components/sport-calendar/sports-calendar-page';
import useFootballCalendar from '@/src/hooks/football/useFootballCalendar';
import { SportCalendarConfig } from '@/src/types/sportCalendar';

const footballCalendarConfig: SportCalendarConfig = {
  title: 'Football Match Calendar',
  loadingMessage: 'Loading football match calendar...',
  sportType: 'football',
};

const FootballCalendarPage: React.FC = () => {
  return (
    <SportsCalendarPage
      config={footballCalendarConfig}
      useCalendarHook={useFootballCalendar}
    />
  );
};

export default FootballCalendarPage;
