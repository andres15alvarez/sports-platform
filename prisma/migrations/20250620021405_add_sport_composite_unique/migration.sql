/*
  Warnings:

  - A unique constraint covering the columns `[leagueId,sport]` on the table `League` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamId,sport]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Made the column `sport` on table `League` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sport` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "League_leagueId_key";

-- DropIndex
DROP INDEX "Team_teamId_key";

-- AlterTable
ALTER TABLE "League" ALTER COLUMN "sport" SET NOT NULL;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "sport" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "League_leagueId_sport_key" ON "League"("leagueId", "sport");

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamId_sport_key" ON "Team"("teamId", "sport");
