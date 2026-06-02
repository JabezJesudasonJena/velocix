/*
  Warnings:

  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantity",
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "Item_orderId_idx" ON "Item"("orderId");

-- CreateIndex
CREATE INDEX "Item_id_idx" ON "Item"("id");

-- CreateIndex
CREATE INDEX "Item_productId_idx" ON "Item"("productId");
