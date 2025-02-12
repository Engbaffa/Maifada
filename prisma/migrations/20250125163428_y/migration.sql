/*
  Warnings:

  - Added the required column `sessionId` to the `studentLevel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "studentLevel" ADD COLUMN     "sessionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "studentLevel" ADD CONSTRAINT "studentLevel_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "studentSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
