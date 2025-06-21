import { FixtureResponse, ResultFilter } from '@/src/types/types';

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

export const getResultType = (fixture: FixtureResponse) => {
  const homeGoals = fixture.goals.home || 0;
  const awayGoals = fixture.goals.away || 0;

  if (homeGoals > awayGoals) return 'Home Win';
  if (awayGoals > homeGoals) return 'Away Win';
  return 'Draw';
};

export const filterFixtures = (
  fixtures: FixtureResponse[],
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
