/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Level` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Level` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `NextOfKin` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `NextOfKin` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PreviousSchool` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PreviousSchool` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Semester` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Semester` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `StudentCourse` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `StudentCourse` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `StudentPayment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `StudentPayment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `StudentProgram` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `StudentProgram` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Level" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "NextOfKin" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "PreviousSchool" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Semester" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "StudentCourse" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "StudentPayment" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "StudentProgram" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
