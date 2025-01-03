/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Payment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PaymentType";

-- CreateIndex
CREATE UNIQUE INDEX "Payment_type_key" ON "Payment"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_type_amount_description_key" ON "Payment"("type", "amount", "description");
