/*
  Warnings:

  - You are about to drop the column `orderId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_orderId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "orderId";

-- CreateTable
CREATE TABLE "_ItemToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ItemToOrder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ItemToOrder_B_index" ON "_ItemToOrder"("B");

-- AddForeignKey
ALTER TABLE "_ItemToOrder" ADD CONSTRAINT "_ItemToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToOrder" ADD CONSTRAINT "_ItemToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
