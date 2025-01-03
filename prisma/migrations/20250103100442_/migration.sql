/*
  Warnings:

  - A unique constraint covering the columns `[studentId,sessionId,paymentId]` on the table `StudentPayment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StudentPayment_studentId_sessionId_paymentId_key" ON "StudentPayment"("studentId", "sessionId", "paymentId");
