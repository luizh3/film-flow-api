/*
  Warnings:

  - You are about to alter the column `score` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(3,1)`.

*/
-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "score" SET DATA TYPE DECIMAL(3,1);
