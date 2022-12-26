/*
  Warnings:

  - You are about to drop the column `itens_VendidosId` on the `Vendas` table. All the data in the column will be lost.
  - You are about to drop the `Item_Linha` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Itens_Vendidos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cartId` to the `Vendas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item_Linha" DROP CONSTRAINT "Item_Linha_itens_VendidosId_fkey";

-- DropForeignKey
ALTER TABLE "Item_Linha" DROP CONSTRAINT "Item_Linha_produtosId_fkey";

-- DropForeignKey
ALTER TABLE "Vendas" DROP CONSTRAINT "Vendas_itens_VendidosId_fkey";

-- AlterTable
ALTER TABLE "Vendas" DROP COLUMN "itens_VendidosId",
ADD COLUMN     "cartId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Item_Linha";

-- DropTable
DROP TABLE "Itens_Vendidos";

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "qtde_Items" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart_Items" (
    "produtosId" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "qtde" INTEGER NOT NULL DEFAULT 1,
    "preco" INTEGER NOT NULL DEFAULT 1,
    "desconto" INTEGER NOT NULL DEFAULT 0,
    "subTotal" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Cart_Items_pkey" PRIMARY KEY ("produtosId","cartId")
);

-- AddForeignKey
ALTER TABLE "Vendas" ADD CONSTRAINT "Vendas_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Items" ADD CONSTRAINT "Cart_Items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Items" ADD CONSTRAINT "Cart_Items_produtosId_fkey" FOREIGN KEY ("produtosId") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
