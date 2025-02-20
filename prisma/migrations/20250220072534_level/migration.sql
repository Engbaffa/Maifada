/*
  Warnings:

  - You are about to drop the column `levelno` on the `studentSemester` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId,studentlevelId,semesterId]` on the table `studentSemester` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentlevelId` to the `studentSemester` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "studentSemester" DROP CONSTRAINT "studentSemester_levelno_fkey";

-- DropIndex
DROP INDEX "studentSemester_studentId_levelno_semesterId_key";

-- AlterTable
ALTER TABLE "studentSemester" DROP COLUMN "levelno",
ADD COLUMN     "studentlevelId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "studentSemester_studentId_studentlevelId_semesterId_key" ON "studentSemester"("studentId", "studentlevelId", "semesterId");

-- AddForeignKey
ALTER TABLE "studentSemester" ADD CONSTRAINT "studentSemester_studentlevelId_fkey" FOREIGN KEY ("studentlevelId") REFERENCES "studentLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
