/*
  Warnings:

  - A unique constraint covering the columns `[semsterId,courseId,studentId]` on the table `StudentCourse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,paymentId,levelId]` on the table `StudentPayment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `StudentProgram` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[levelId,studentId]` on the table `studentLevel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sessionId,studentId]` on the table `studentSession` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "StudentPayment_studentId_paymentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "StudentCourse_semsterId_courseId_studentId_key" ON "StudentCourse"("semsterId", "courseId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentPayment_studentId_paymentId_levelId_key" ON "StudentPayment"("studentId", "paymentId", "levelId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProgram_studentId_key" ON "StudentProgram"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "studentLevel_levelId_studentId_key" ON "studentLevel"("levelId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "studentSession_sessionId_studentId_key" ON "studentSession"("sessionId", "studentId");
