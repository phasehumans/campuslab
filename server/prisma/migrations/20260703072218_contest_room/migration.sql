/*
  Warnings:

  - You are about to drop the `Playlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProblemPlaylist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProblemPlaylist" DROP CONSTRAINT "ProblemPlaylist_playListId_fkey";

-- DropForeignKey
ALTER TABLE "ProblemPlaylist" DROP CONSTRAINT "ProblemPlaylist_problemId_fkey";

-- DropTable
DROP TABLE "Playlist";

-- DropTable
DROP TABLE "ProblemPlaylist";

-- CreateTable
CREATE TABLE "ContestRoom" (
    "code" TEXT NOT NULL,
    "hostUserId" TEXT NOT NULL,
    "maxParticipants" INTEGER,
    "questionCount" INTEGER NOT NULL,
    "timeLimitMinutes" INTEGER NOT NULL,
    "topics" TEXT[],
    "problemIds" TEXT[],
    "problemPoints" JSONB NOT NULL,
    "participants" JSONB NOT NULL,
    "standings" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContestRoom_pkey" PRIMARY KEY ("code")
);
