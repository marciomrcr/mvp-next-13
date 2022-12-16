/*
  Warnings:

  - The `status` column on the `pessoa_juridica` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pessoa_juridica" ALTER COLUMN "creditLimit" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;
