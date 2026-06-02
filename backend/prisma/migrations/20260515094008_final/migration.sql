/*
  Warnings:

  - You are about to drop the `_ItemToOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ItemToOrder" DROP CONSTRAINT "_ItemToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToOrder" DROP CONSTRAINT "_ItemToOrder_B_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ItemToOrder";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
