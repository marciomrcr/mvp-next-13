/*
  Warnings:

  - You are about to drop the column `productName` on the `Produtos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[produtoNome]` on the table `Produtos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `produtoNome` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Produtos_productName_idx";

-- DropIndex
DROP INDEX "Produtos_productName_key";

-- AlterTable
ALTER TABLE "Produtos" DROP COLUMN "productName",
ADD COLUMN     "preco" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "produtoNome" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Produtos_produtoNome_key" ON "Produtos"("produtoNome");

-- CreateIndex
CREATE INDEX "Produtos_produtoNome_idx" ON "Produtos"("produtoNome");
