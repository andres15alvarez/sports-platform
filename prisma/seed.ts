/* eslint-disable */

const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();

const SPORTS = [
  { key: 'FOOTBALL_LEAGUES', api: 'v3.football', hasNestedLeague: true },
  { key: 'BASKETBALL_LEAGUES', api: 'v1.basketball', hasNestedLeague: false },
  { key: 'BASEBALL_LEAGUES', api: 'v1.baseball', hasNestedLeague: false },
];

// Helper function to get current season
function getCurrentSeason(seasons: any[], isFootball: boolean) {
  // Look for current season first
  const currentSeason = seasons.find((s: any) => s.current === true);

  if (currentSeason) {
    return isFootball ? currentSeason.year : currentSeason.season;
  }

  // If no current flag, get the latest season
  const latestSeason = seasons[seasons.length - 1];
  return latestSeason.season;
}

async function main() {
  console.log('Starting database seeding...');
  await prisma.team.deleteMany();
  await prisma.league.deleteMany();
  for (const sport of SPORTS) {
    const leagueEnv = process.env[sport.key];
    if (!leagueEnv) {
      console.log(`No leagues configured for ${sport.key}`);
      continue;
    }

    const leagueIds = leagueEnv
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);
    console.log(`Processing ${leagueIds.length} leagues for ${sport.key}`);

    for (const leagueId of leagueIds) {
      try {
        const sportName = sport.api.split('.')[1];
        console.log(`Fetching league ${leagueId} for ${sport.api}...`);

        // Fetch league info
        const leagueRes = await axios.get(
          `https://${sport.api}.api-sports.io/leagues?id=${leagueId}`,
          {
            headers: { 'x-rapidapi-key': process.env.API_KEY },
          },
        );

        // Handle different response structures
        let leagueData, countryData, responseData;
        responseData = leagueRes.data.response[0];
        if (sport.hasNestedLeague) {
          // Football API: response[0].league and response[0].country
          leagueData = leagueRes.data.response[0]?.league;
          countryData = leagueRes.data.response[0]?.country;
        } else {
          // Basketball and Baseball API: response[0] directly contains league data
          leagueData = leagueRes.data.response[0];
          countryData = leagueRes.data.response[0]?.country;
        }

        if (!leagueData) {
          console.log(`League ${leagueId} not found for ${sport.api}`);
          continue;
        }

        // Get current season
        const currentSeason = getCurrentSeason(
          responseData.seasons,
          sport.api === 'v3.football',
        );
        if (!currentSeason) {
          console.log(`No season found for league ${leagueData.name}`);
          continue;
        }

        // Upsert League
        await prisma.league.upsert({
          where: {
            leagueId_sport: { leagueId: leagueData.id, sport: sportName },
          },
          update: {},
          create: {
            leagueId: leagueData.id,
            name: leagueData.name,
            type: leagueData.type,
            logo: leagueData.logo,
            country: countryData?.name,
            countryCode: countryData?.code,
            countryFlag: countryData?.flag,
            sport: sportName,
          },
        });

        console.log(
          `League ${leagueData.name} (${leagueData.id}) processed successfully`,
        );

        // Fetch teams for league with season parameter
        console.log(
          `Fetching teams for league ${leagueId} with season ${currentSeason}...`,
        );
        const teamsRes = await axios.get(
          `https://${sport.api}.api-sports.io/teams?league=${leagueId}&season=${currentSeason}`,
          {
            headers: { 'x-rapidapi-key': process.env.API_KEY },
          },
        );
        console.log(`Teams fetched: ${teamsRes.data.response.length}`);

        let teamsProcessed = 0;
        for (const t of teamsRes.data.response) {
          let team;
          if (sport.hasNestedLeague) {
            team = t.team;
          } else {
            team = t;
          }

          // Check if team already exists
          const existingTeam = await prisma.team.findUnique({
            where: { teamId_sport: { teamId: team.id, sport: sportName } },
          });

          if (!existingTeam) {
            // Insert only if team doesn't exist
            await prisma.team.create({
              data: {
                teamId: team.id,
                name: team.name,
                code: team.code ? team.code : team.id.toString(),
                country:
                  typeof team.country === 'string'
                    ? team.country
                    : team.country?.name,
                logo: team.logo,
                sport: sportName,
              },
            });
            teamsProcessed++;
          }
        }

        console.log(
          `${teamsProcessed} new teams added for league ${leagueData.name}`,
        );
      } catch (error) {
        console.error(
          `Error processing league ${leagueId} for ${sport.api}:`,
          error instanceof Error ? error.message : String(error),
        );
      }
    }
  }

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
