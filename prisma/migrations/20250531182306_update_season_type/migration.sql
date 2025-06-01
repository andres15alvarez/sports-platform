-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "season" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "coverage" JSONB,
    CONSTRAINT "Season_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Season" ("coverage", "end", "id", "leagueId", "season", "start") SELECT "coverage", "end", "id", "leagueId", "season", "start" FROM "Season";
DROP TABLE "Season";
ALTER TABLE "new_Season" RENAME TO "Season";
CREATE UNIQUE INDEX "Season_leagueId_season_key" ON "Season"("leagueId", "season");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
