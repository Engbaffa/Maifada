/*
  Warnings:

  - A unique constraint covering the columns `[type,amount,description]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[startYear,endYear,title]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `StudentCourse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `StudentPayment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Session_startYear_endYear_key";

-- DropIndex
DROP INDEX "StudentCourse_studentId_courseId_key";

-- DropIndex
DROP INDEX "StudentPayment_studentId_paymentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Payment_type_amount_description_key" ON "Payment"("type", "amount", "description");

-- CreateIndex
CREATE UNIQUE INDEX "Session_startYear_endYear_title_key" ON "Session"("startYear", "endYear", "title");

-- CreateIndex
CREATE UNIQUE INDEX "StudentCourse_studentId_key" ON "StudentCourse"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentPayment_studentId_key" ON "StudentPayment"("studentId");
