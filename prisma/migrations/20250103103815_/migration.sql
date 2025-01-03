/*
  Warnings:

  - A unique constraint covering the columns `[studentId,sessionId,semesterId,courseId,programId]` on the table `StudentCourse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StudentCourse_studentId_sessionId_semesterId_courseId_progr_key" ON "StudentCourse"("studentId", "sessionId", "semesterId", "courseId", "programId");
