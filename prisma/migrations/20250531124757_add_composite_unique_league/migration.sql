/*
  Warnings:

  - A unique constraint covering the columns `[leagueId,sportId]` on the table `League` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "League_leagueId_key";

-- CreateIndex
CREATE UNIQUE INDEX "League_leagueId_sportId_key" ON "League"("leagueId", "sportId");
