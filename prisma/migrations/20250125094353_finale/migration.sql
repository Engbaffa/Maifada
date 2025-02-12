/*
  Warnings:

  - The values [FREHSER] on the enum `LevelType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LevelType_new" AS ENUM ('FRESHMEN', 'SOPHOMORE', 'JUNIOR', 'SENIOR');
ALTER TABLE "Level" ALTER COLUMN "title" TYPE "LevelType_new" USING ("title"::text::"LevelType_new");
ALTER TYPE "LevelType" RENAME TO "LevelType_old";
ALTER TYPE "LevelType_new" RENAME TO "LevelType";
DROP TYPE "LevelType_old";
COMMIT;
