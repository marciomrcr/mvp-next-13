/*
  Warnings:

  - You are about to drop the `Produto_Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Venda_Linha` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itens_VendidosId` to the `Vendas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Produto_Item" DROP CONSTRAINT "Produto_Item_produtosId_fkey";

-- DropForeignKey
ALTER TABLE "Venda_Linha" DROP CONSTRAINT "Venda_Linha_produto_ItemId_fkey";

-- DropForeignKey
ALTER TABLE "Venda_Linha" DROP CONSTRAINT "Venda_Linha_vendasId_fkey";

-- AlterTable
ALTER TABLE "Vendas" ADD COLUMN     "itens_VendidosId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Produto_Item";

-- DropTable
DROP TABLE "Venda_Linha";

-- CreateTable
CREATE TABLE "Itens_Vendidos" (
    "id" TEXT NOT NULL,
    "qtde_produtos" INTEGER NOT NULL,
    "subTotal" INTEGER NOT NULL,

    CONSTRAINT "Itens_Vendidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item_Linha" (
    "itens_VendidosId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "produtosId" TEXT NOT NULL,
    "qtde" INTEGER NOT NULL,
    "preco" INTEGER NOT NULL,

    CONSTRAINT "Item_Linha_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vendas" ADD CONSTRAINT "Vendas_itens_VendidosId_fkey" FOREIGN KEY ("itens_VendidosId") REFERENCES "Itens_Vendidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_Linha" ADD CONSTRAINT "Item_Linha_produtosId_fkey" FOREIGN KEY ("produtosId") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_Linha" ADD CONSTRAINT "Item_Linha_itens_VendidosId_fkey" FOREIGN KEY ("itens_VendidosId") REFERENCES "Itens_Vendidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
