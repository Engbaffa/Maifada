/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `NextOfKin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `PreviousSchool` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NextOfKin_studentId_key" ON "NextOfKin"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "PreviousSchool_studentId_key" ON "PreviousSchool"("studentId");
