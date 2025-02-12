/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Level` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Level_title_key" ON "Level"("title");
