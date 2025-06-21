interface SportApiConfig {
  apiEndpoint: string;
  apiHost: string;
  season: string;
  apiKey: string;
}

const sportsApiConfig: Record<string, SportApiConfig> = {
  football: {
    apiEndpoint: 'https://v3.football.api-sports.io/fixtures',
    apiHost: 'v3.football.api-sports.io',
    season: '2025',
    apiKey: process.env.NEXT_PUBLIC_API_KEYY || '',
  },
  basketball: {
    apiEndpoint: 'https://v1.basketball.api-sports.io/games',
    apiHost: 'v1.basketball.api-sports.io',
    season: '2024-2025',
    apiKey: process.env.NEXT_PUBLIC_API_KEYY || '',
  },
  baseball: {
    apiEndpoint: 'https://v1.baseball.api-sports.io/games',
    apiHost: 'v1.baseball.api-sports.io',
    season: '2025',
    apiKey: process.env.NEXT_PUBLIC_API_KEYY || '',
  },
};

export const getSportApiConfig = (sport: string): SportApiConfig => {
  const config = sportsApiConfig[sport];
  if (!config) {
    throw new Error(`Unsupported sport type: ${sport}`);
  }
  return config;
}; 