'use client';

import React from 'react';
import { SportCalendar } from '@/src/components/sport-calendar';
import useBasketballCalendar from '@/src/hooks/basketball/useBasketballCalendar';

const BasketballCalendarPage: React.FC = () => {
  return <SportCalendar useCalendarHook={useBasketballCalendar} />;
};

export default BasketballCalendarPage;
