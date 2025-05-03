export const API_URL = 'https://v1.basketball.api-sports.io';

export const ENDPOINTS = {
  LEAGUES: '/leagues',
  GAMES: '/games',
};

export const API_HEADERS = {
  'X-RapidAPI-Key': process.env.API_KEY || '',
  'X-RapidAPI-Host': 'v1.basketball.api-sports.io',
};
