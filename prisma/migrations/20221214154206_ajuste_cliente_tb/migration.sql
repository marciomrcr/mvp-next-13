/*
  Warnings:

  - Made the column `phone` on table `pessoa_fisica` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pessoa_fisica" ALTER COLUMN "creditLimit" DROP NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;
