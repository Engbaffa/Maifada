/*
  Warnings:

  - You are about to drop the column `semsterId` on the `StudentCourse` table. All the data in the column will be lost.
  - You are about to drop the column `studentlevelId` on the `StudentPayment` table. All the data in the column will be lost.
  - You are about to drop the column `studentsessionId` on the `studentLevel` table. All the data in the column will be lost.
  - You are about to drop the column `studentlevelId` on the `studentSemester` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[semesterId,courseId,studentId]` on the table `StudentCourse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,paymentId,studentLevelId]` on the table `StudentPayment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId,studentLevelId,semesterId]` on the table `studentSemester` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `semesterId` to the `StudentCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentLevelId` to the `StudentPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentSessionId` to the `studentLevel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentLevelId` to the `studentSemester` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudentCourse" DROP CONSTRAINT "StudentCourse_semsterId_fkey";

-- DropForeignKey
ALTER TABLE "StudentPayment" DROP CONSTRAINT "StudentPayment_studentlevelId_fkey";

-- DropForeignKey
ALTER TABLE "studentLevel" DROP CONSTRAINT "studentLevel_studentsessionId_fkey";

-- DropForeignKey
ALTER TABLE "studentSemester" DROP CONSTRAINT "studentSemester_studentlevelId_fkey";

-- DropIndex
DROP INDEX "Payment_type_key";

-- DropIndex
DROP INDEX "StudentCourse_semsterId_courseId_studentId_key";

-- DropIndex
DROP INDEX "StudentPayment_studentId_paymentId_studentlevelId_key";

-- DropIndex
DROP INDEX "StudentProgram_studentId_key";

-- DropIndex
DROP INDEX "studentSemester_studentId_studentlevelId_semesterId_key";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "gender" SET DEFAULT 'OTHER';

-- AlterTable
ALTER TABLE "StudentCourse" DROP COLUMN "semsterId",
ADD COLUMN     "semesterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentPayment" DROP COLUMN "studentlevelId",
ADD COLUMN     "studentLevelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "studentLevel" DROP COLUMN "studentsessionId",
ADD COLUMN     "studentSessionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "studentSemester" DROP COLUMN "studentlevelId",
ADD COLUMN     "studentLevelId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StudentCourse_semesterId_courseId_studentId_key" ON "StudentCourse"("semesterId", "courseId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentPayment_studentId_paymentId_studentLevelId_key" ON "StudentPayment"("studentId", "paymentId", "studentLevelId");

-- CreateIndex
CREATE UNIQUE INDEX "studentSemester_studentId_studentLevelId_semesterId_key" ON "studentSemester"("studentId", "studentLevelId", "semesterId");

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "studentSemester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentLevel" ADD CONSTRAINT "studentLevel_studentSessionId_fkey" FOREIGN KEY ("studentSessionId") REFERENCES "studentSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPayment" ADD CONSTRAINT "StudentPayment_studentLevelId_fkey" FOREIGN KEY ("studentLevelId") REFERENCES "studentLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentSemester" ADD CONSTRAINT "studentSemester_studentLevelId_fkey" FOREIGN KEY ("studentLevelId") REFERENCES "studentLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
