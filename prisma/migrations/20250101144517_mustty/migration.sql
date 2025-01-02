/*
  Warnings:

  - A unique constraint covering the columns `[name,sessionId]` on the table `Semester` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Semester_name_sessionId_key" ON "Semester"("name", "sessionId");
