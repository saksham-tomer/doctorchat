/*
  Warnings:

  - You are about to drop the column `firstname` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "firstname",
DROP COLUMN "lastname",
ADD COLUMN     "illness" TEXT[],
ADD COLUMN     "name" TEXT,
ALTER COLUMN "age" SET DATA TYPE TEXT,
ALTER COLUMN "sex" SET DATA TYPE TEXT;
