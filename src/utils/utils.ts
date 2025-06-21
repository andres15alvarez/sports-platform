import { ResultFilter } from '@/src/types/types';
import { CommonFixture } from '@/src/types/sportsResults';

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const getResultType = (fixture: CommonFixture) => {
  const homeScore = fixture.score.home || 0;
  const awayScore = fixture.score.away || 0;

  if (homeScore > awayScore) return 'Home Win';
  if (awayScore > homeScore) return 'Away Win';
  return 'Draw';
};

export const filterFixtures = (
  fixtures: CommonFixture[],
  selectedFilter: ResultFilter,
) => {
  if (selectedFilter === 'All Results') return fixtures;

  return fixtures.filter((fixture) => {
    const resultType = getResultType(fixture);
    if (selectedFilter === 'Home Wins') return resultType === 'Home Win';
    if (selectedFilter === 'Away Wins') return resultType === 'Away Win';
    if (selectedFilter === 'Draws') return resultType === 'Draw';
    return true;
  });
};
