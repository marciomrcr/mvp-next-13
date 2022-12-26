/*
  Warnings:

  - A unique constraint covering the columns `[vendasId]` on the table `ProdutosVendas` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ProdutosVendas_produtosId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "ProdutosVendas_vendasId_key" ON "ProdutosVendas"("vendasId");

-- CreateIndex
CREATE INDEX "ProdutosVendas_produtosId_vendasId_idx" ON "ProdutosVendas"("produtosId", "vendasId");
