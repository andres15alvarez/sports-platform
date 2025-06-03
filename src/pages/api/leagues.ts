import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { sport, ids } = req.query;

  if (!sport || typeof sport !== 'string') {
    return res.status(400).json({ error: 'Missing sport' });
  }

  const leagueIds =
    typeof ids === 'string'
      ? ids
          .split(',')
          .map((id) => parseInt(id, 10))
          .filter(Boolean)
      : [];

  try {
    const leagues = await prisma.league.findMany({
      where: {
        sport: {
          name: sport,
        },
        leagueId: {
          in: leagueIds,
        },
      },
    });

    res.status(200).json(leagues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch leagues' });
  }
}
