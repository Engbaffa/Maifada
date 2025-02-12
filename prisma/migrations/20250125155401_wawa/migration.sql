/*
  Warnings:

  - A unique constraint covering the columns `[studentId,levelId,semesterId]` on the table `studentSemester` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "studentSemester_studentId_levelId_semesterId_key" ON "studentSemester"("studentId", "levelId", "semesterId");
