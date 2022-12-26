/*
  Warnings:

  - You are about to drop the column `produtosId` on the `ProdutosVendas` table. All the data in the column will be lost.
  - You are about to drop the column `vendasId` on the `ProdutosVendas` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[produtoId]` on the table `ProdutosVendas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vendaId]` on the table `ProdutosVendas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `produtoId` to the `ProdutosVendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendaId` to the `ProdutosVendas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProdutosVendas" DROP CONSTRAINT "ProdutosVendas_produtosId_fkey";

-- DropForeignKey
ALTER TABLE "ProdutosVendas" DROP CONSTRAINT "ProdutosVendas_vendasId_fkey";

-- DropIndex
DROP INDEX "ProdutosVendas_produtosId_key";

-- DropIndex
DROP INDEX "ProdutosVendas_produtosId_vendasId_idx";

-- DropIndex
DROP INDEX "ProdutosVendas_vendasId_key";

-- AlterTable
ALTER TABLE "ProdutosVendas" DROP COLUMN "produtosId",
DROP COLUMN "vendasId",
ADD COLUMN     "produtoId" TEXT NOT NULL,
ADD COLUMN     "vendaId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProdutosVendas_produtoId_key" ON "ProdutosVendas"("produtoId");

-- CreateIndex
CREATE UNIQUE INDEX "ProdutosVendas_vendaId_key" ON "ProdutosVendas"("vendaId");

-- AddForeignKey
ALTER TABLE "ProdutosVendas" ADD CONSTRAINT "ProdutosVendas_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutosVendas" ADD CONSTRAINT "ProdutosVendas_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
