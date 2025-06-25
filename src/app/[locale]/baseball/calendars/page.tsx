'use client';

import React from 'react';
import SportsCalendarPage from '@/src/components/sport-calendar/sports-calendar-page';
import useBaseballCalendar from '@/src/hooks/baseball/useBaseballCalendar';
import { SportCalendarConfig } from '@/src/types/sportCalendar';

const baseballCalendarConfig: SportCalendarConfig = {
  title: 'Baseball Match Calendar',
  loadingMessage: 'Loading baseball match calendar...',
  sportType: 'baseball',
};

const BaseballCalendarPage: React.FC = () => {
  return (
    <SportsCalendarPage
      config={baseballCalendarConfig}
      useCalendarHook={useBaseballCalendar}
    />
  );
};

export default BaseballCalendarPage;
