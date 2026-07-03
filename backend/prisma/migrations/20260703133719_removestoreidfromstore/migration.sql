/*
  Warnings:

  - You are about to drop the column `storeId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_storeId_fkey";

-- DropIndex
DROP INDEX "Order_storeId_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "storeId";
