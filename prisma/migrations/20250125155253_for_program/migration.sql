/*
  Warnings:

  - A unique constraint covering the columns `[programId,studentId]` on the table `StudentProgram` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StudentProgram_programId_studentId_key" ON "StudentProgram"("programId", "studentId");
