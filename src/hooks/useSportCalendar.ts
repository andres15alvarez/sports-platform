import useFootballCalendar from './football/useFootballCalendar';
import useBasketballCalendar from './basketball/useBasketballCalendar';
import useBaseballCalendar from './baseball/useBaseballCalendar';
import { UseCalendarHook } from '@/src/types/sportCalendar';

type SportType = 'football' | 'basketball' | 'baseball';

const useSportCalendar = (sport: SportType): UseCalendarHook => {
  const footballHook = useFootballCalendar();
  const basketballHook = useBasketballCalendar();
  const baseballHook = useBaseballCalendar();

  const getHookForSport = (sportType: SportType): UseCalendarHook => {
    switch (sportType) {
      case 'football':
        return footballHook;
      case 'basketball':
        return basketballHook;
      case 'baseball':
        return baseballHook;
      default:
        return footballHook;
    }
  };

  return getHookForSport(sport);
};

export default useSportCalendar; 