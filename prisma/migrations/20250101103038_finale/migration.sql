/*
  Warnings:

  - You are about to drop the column `programId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `semesterId` on the `Course` table. All the data in the column will be lost.
  - Added the required column `programId` to the `StudentCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semesterId` to the `StudentCourse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_programId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_semesterId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "programId",
DROP COLUMN "semesterId";

-- AlterTable
ALTER TABLE "PreviousSchool" ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "dateOfBirth" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StudentCourse" ADD COLUMN     "programId" INTEGER NOT NULL,
ADD COLUMN     "semesterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentCourse" ADD CONSTRAINT "StudentCourse_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
