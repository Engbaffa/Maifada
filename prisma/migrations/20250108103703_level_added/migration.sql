/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `StudentCourse` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `StudentPayment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,programId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,semesterId,courseId,programId]` on the table `StudentCourse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,paymentId]` on the table `StudentPayment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `levelId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelId` to the `StudentCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelId` to the `StudentPayment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LevelType" AS ENUM ('FREHSER', 'SOPHOMORE', 'JUNIOR', 'SENIOR');

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "StudentPayment" DROP CONSTRAINT "StudentPayment_sessionId_fkey";

-- DropIndex
DROP INDEX "Student_email_programId_sessionId_key";

-- DropIndex
DROP INDEX "StudentCourse_studentId_sessionId_semesterId_courseId_progr_key";

-- DropIndex
DROP INDEX "StudentPayment_studentId_sessionId_paymentId_key";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "levelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "sessionId";

-- AlterTable
ALTER TABLE "StudentCourse" DROP COLUMN "sessionId",
ADD COLUMN     "levelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentPayment" DROP COLUMN "sessionId",
ADD COLUMN     "levelId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "title" "LevelType" NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_programId_key" ON "Student"("email", "programId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentCourse_studentId_semesterId_courseId_programId_key" ON "StudentCourse"("studentId", "semesterId", "courseId", "programId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentPayment_studentId_paymentId_key" ON "StudentPayment"("studentId", "paymentId");

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPayment" ADD CONSTRAINT "StudentPayment_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
