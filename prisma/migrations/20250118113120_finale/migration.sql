/*
  Warnings:

  - You are about to drop the column `levelId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Level` table. All the data in the column will be lost.
  - You are about to drop the column `programId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `levelId` on the `StudentCourse` table. All the data in the column will be lost.
  - You are about to drop the column `programId` on the `StudentCourse` table. All the data in the column will be lost.
  - You are about to drop the column `semesterId` on the `StudentCourse` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `semsterId` to the `StudentCourse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_levelId_fkey";

-- DropForeignKey
ALTER TABLE "Level" DROP CONSTRAINT "Level_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_programId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_levelId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_programId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_semesterId_fkey";

-- DropForeignKey
ALTER TABLE "StudentPayment" DROP CONSTRAINT "StudentPayment_levelId_fkey";

-- DropIndex
DROP INDEX "Student_email_programId_key";

-- DropIndex
DROP INDEX "StudentCourse_studentId_semesterId_courseId_programId_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "levelId";

-- AlterTable
ALTER TABLE "Level" DROP COLUMN "sessionId";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "programId";

-- AlterTable
ALTER TABLE "StudentCourse" DROP COLUMN "levelId",
DROP COLUMN "programId",
DROP COLUMN "semesterId",
ADD COLUMN     "semsterId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "StudentProgram" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "StudentProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentSession" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "studentSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentLevel" (
    "id" SERIAL NOT NULL,
    "levelId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "studentLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentSemester" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,
    "semesterId" INTEGER NOT NULL,

    CONSTRAINT "studentSemester_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "StudentProgram" ADD CONSTRAINT "StudentProgram_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProgram" ADD CONSTRAINT "StudentProgram_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_semsterId_fkey" FOREIGN KEY ("semsterId") REFERENCES "studentSemester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentSession" ADD CONSTRAINT "studentSession_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentSession" ADD CONSTRAINT "studentSession_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentLevel" ADD CONSTRAINT "studentLevel_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentLevel" ADD CONSTRAINT "studentLevel_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPayment" ADD CONSTRAINT "StudentPayment_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "studentLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentSemester" ADD CONSTRAINT "studentSemester_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentSemester" ADD CONSTRAINT "studentSemester_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "studentLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentSemester" ADD CONSTRAINT "studentSemester_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
