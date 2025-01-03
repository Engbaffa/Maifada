/*
  Warnings:

  - A unique constraint covering the columns `[email,programId,sessionId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Student_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_programId_sessionId_key" ON "Student"("email", "programId", "sessionId");
