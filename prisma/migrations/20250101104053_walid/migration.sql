/*
  Warnings:

  - You are about to drop the `StudentProgram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentSession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `programId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "StudentProgram" DROP CONSTRAINT "StudentProgram_programId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProgram" DROP CONSTRAINT "StudentProgram_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentSession" DROP CONSTRAINT "StudentSession_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "StudentSession" DROP CONSTRAINT "StudentSession_studentId_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "programId" INTEGER NOT NULL,
ADD COLUMN     "sessionId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "StudentProgram";

-- DropTable
DROP TABLE "StudentSession";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
