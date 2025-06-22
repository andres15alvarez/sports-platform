'use client';

import React from 'react';
import { SportCalendar } from '@/src/components/sport-calendar';
import useBaseballCalendar from '@/src/hooks/baseball/useBaseballCalendar';

const BaseballCalendarPage: React.FC = () => {
  return <SportCalendar useCalendarHook={useBaseballCalendar} />;
};

export default BaseballCalendarPage; 