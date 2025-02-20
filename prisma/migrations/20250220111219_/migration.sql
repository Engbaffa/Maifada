/*
  Warnings:

  - You are about to drop the column `levelId` on the `StudentPayment` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `studentLevel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId,paymentId,studentlevelId]` on the table `StudentPayment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentlevelId` to the `StudentPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentsessionId` to the `studentLevel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudentPayment" DROP CONSTRAINT "StudentPayment_levelId_fkey";

-- DropForeignKey
ALTER TABLE "studentLevel" DROP CONSTRAINT "studentLevel_sessionId_fkey";

-- DropIndex
DROP INDEX "StudentPayment_studentId_paymentId_levelId_key";

-- AlterTable
ALTER TABLE "StudentPayment" DROP COLUMN "levelId",
ADD COLUMN     "studentlevelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "studentLevel" DROP COLUMN "sessionId",
ADD COLUMN     "studentsessionId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StudentPayment_studentId_paymentId_studentlevelId_key" ON "StudentPayment"("studentId", "paymentId", "studentlevelId");

-- AddForeignKey
ALTER TABLE "studentLevel" ADD CONSTRAINT "studentLevel_studentsessionId_fkey" FOREIGN KEY ("studentsessionId") REFERENCES "studentSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPayment" ADD CONSTRAINT "StudentPayment_studentlevelId_fkey" FOREIGN KEY ("studentlevelId") REFERENCES "studentLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
