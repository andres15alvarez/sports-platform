-- AlterTable
ALTER TABLE "League" ADD COLUMN "countryCode" TEXT;
ALTER TABLE "League" ADD COLUMN "countryFlag" TEXT;
ALTER TABLE "League" ADD COLUMN "logo" TEXT;
ALTER TABLE "League" ADD COLUMN "type" TEXT;

-- CreateTable
CREATE TABLE "Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "season" INTEGER NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "coverage" JSONB,
    CONSTRAINT "Season_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Season_leagueId_season_key" ON "Season"("leagueId", "season");
