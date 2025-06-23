'use client';

import React from 'react';
import { SportCalendar } from '@/src/components/sport-calendar';
import useFootballCalendar from '@/src/hooks/football/useFootballCalendar';

const FootballCalendarPage: React.FC = () => {
  return <SportCalendar useCalendarHook={useFootballCalendar} />;
};

export default FootballCalendarPage;
