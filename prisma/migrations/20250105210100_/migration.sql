/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Semester` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Semester` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Semester" DROP CONSTRAINT "Semester_sessionId_fkey";

-- DropIndex
DROP INDEX "Semester_name_sessionId_key";

-- AlterTable
ALTER TABLE "Semester" DROP COLUMN "sessionId";

-- CreateIndex
CREATE UNIQUE INDEX "Semester_name_key" ON "Semester"("name");
