-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "logo" TEXT,
    "country" TEXT NOT NULL,
    "countryCode" TEXT,
    "countryFlag" TEXT,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "country" TEXT,
    "logo" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "League_leagueId_key" ON "League"("leagueId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamId_key" ON "Team"("teamId");
