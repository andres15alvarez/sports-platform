'use client';

import React from 'react';
import SportsCalendarPage from '@/src/components/sport-calendar/sports-calendar-page';
import useBasketballCalendar from '@/src/hooks/basketball/useBasketballCalendar';
import { SportCalendarConfig } from '@/src/types/sportCalendar';

const basketballCalendarConfig: SportCalendarConfig = {
  title: 'Basketball Match Calendar',
  loadingMessage: 'Loading basketball match calendar...',
  sportType: 'basketball',
};

const BasketballCalendarPage: React.FC = () => {
  return (
    <SportsCalendarPage
      config={basketballCalendarConfig}
      useCalendarHook={useBasketballCalendar}
    />
  );
};

export default BasketballCalendarPage;
