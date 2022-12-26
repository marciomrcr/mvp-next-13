/*
  Warnings:

  - You are about to drop the `ProdutosVendas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProdutosVendas" DROP CONSTRAINT "ProdutosVendas_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "ProdutosVendas" DROP CONSTRAINT "ProdutosVendas_vendaId_fkey";

-- DropTable
DROP TABLE "ProdutosVendas";
