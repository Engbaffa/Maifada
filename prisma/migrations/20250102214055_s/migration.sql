/*
  Warnings:

  - You are about to drop the column `verifyCode` on the `StudentPayment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "StudentPayment_studentId_key";

-- AlterTable
ALTER TABLE "StudentPayment" DROP COLUMN "verifyCode";
