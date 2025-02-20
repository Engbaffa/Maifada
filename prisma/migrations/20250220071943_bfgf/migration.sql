/*
  Warnings:

  - You are about to drop the column `levelId` on the `studentSemester` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId,levelno,semesterId]` on the table `studentSemester` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `levelno` to the `studentSemester` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "studentSemester" DROP CONSTRAINT "studentSemester_levelId_fkey";

-- DropIndex
DROP INDEX "studentSemester_studentId_levelId_semesterId_key";

-- AlterTable
ALTER TABLE "studentSemester" DROP COLUMN "levelId",
ADD COLUMN     "levelno" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "studentSemester_studentId_levelno_semesterId_key" ON "studentSemester"("studentId", "levelno", "semesterId");

-- AddForeignKey
ALTER TABLE "studentSemester" ADD CONSTRAINT "studentSemester_levelno_fkey" FOREIGN KEY ("levelno") REFERENCES "studentLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
