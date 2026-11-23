/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jobId,candidateId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[candidateId,skillId]` on the table `CandidateSkill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jobId,skillId]` on the table `JobSkillRequirement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'DELETED');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('CREDENTIAL', 'GITHUB', 'GOOGLE');

-- CreateEnum
CREATE TYPE "CompanyVerificationStatus" AS ENUM ('DRAFT', 'PENDING', 'NEEDS_MORE_INFO', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('DRAFT', 'PENDING_VERIFICATION', 'ACTIVE', 'CLOSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "IntegrityReviewVerdict" AS ENUM ('PENDING', 'NO_VIOLATION', 'CONFIRMED_VIOLATION');

-- CreateEnum
CREATE TYPE "BackgroundJobStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Role" ADD VALUE 'SUB_RECRUITER';
ALTER TYPE "Role" ADD VALUE 'SYSTEM_ADMIN';

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "cvSnapshotUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "perSkillBreakdown" JSONB NOT NULL DEFAULT '[]',
ALTER COLUMN "status" SET DEFAULT 'APPLIED',
ALTER COLUMN "matchScore" SET DEFAULT 0,
ALTER COLUMN "matchExplanation" SET DEFAULT '';

-- AlterTable
ALTER TABLE "AssessmentAttempt" ADD COLUMN     "configSnapshot" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "reviewReason" TEXT,
ADD COLUMN     "reviewVerdict" "IntegrityReviewVerdict" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "reviewerId" TEXT,
ALTER COLUMN "status" SET DEFAULT 'STARTED',
ALTER COLUMN "totalScore" SET DEFAULT 0,
ALTER COLUMN "startedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "completedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AssessmentTemplate" ADD COLUMN     "overallDurationSecs" INTEGER NOT NULL DEFAULT 300;

-- AlterTable
ALTER TABLE "CandidateProfile" ADD COLUMN     "githubSyncCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "githubSyncResetAt" TIMESTAMP(3),
ALTER COLUMN "headline" SET DEFAULT '',
ALTER COLUMN "education" SET DEFAULT '[]',
ALTER COLUMN "links" SET DEFAULT '{}',
ALTER COLUMN "cvUrl" SET DEFAULT '',
ALTER COLUMN "subscriptionTier" SET DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "recruiterAffiliationProof" JSONB NOT NULL DEFAULT '{}',
ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "verificationDocuments" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "verificationStatus" "CompanyVerificationStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "website" SET DEFAULT '',
ALTER COLUMN "logoUrl" SET DEFAULT '',
ALTER COLUMN "subscriptionTier" SET DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "Evidence" ALTER COLUMN "embedding" DROP NOT NULL;

-- AlterTable
ALTER TABLE "GitHubRepo" ADD COLUMN     "isSelected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastSyncCommitSha" TEXT;

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "status" SET DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "points" DOUBLE PRECISION NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "currency" SET DEFAULT 'BDT';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordHash",
ADD COLUMN     "authProvider" "AuthProvider" NOT NULL DEFAULT 'CREDENTIAL',
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "imagePublicId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "isAssessmentBanned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "needPasswordChange" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
ALTER COLUMN "role" SET DEFAULT 'CANDIDATE';

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "targetUrl" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackgroundJob" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "BackgroundJobStatus" NOT NULL DEFAULT 'PENDING',
    "correlationId" TEXT,
    "payload" JSONB NOT NULL DEFAULT '{}',
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "errorSummary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BackgroundJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_jobId_candidateId_key" ON "Application"("jobId", "candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateSkill_candidateId_skillId_key" ON "CandidateSkill"("candidateId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "JobSkillRequirement_jobId_skillId_key" ON "JobSkillRequirement"("jobId", "skillId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
