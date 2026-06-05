/*
  Warnings:

  - You are about to drop the column `lat` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Store` table. All the data in the column will be lost.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "lat",
DROP COLUMN "lng",
ADD COLUMN     "location" geometry(Point, 4326);
