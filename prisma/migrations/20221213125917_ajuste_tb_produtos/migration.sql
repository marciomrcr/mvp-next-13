/*
  Warnings:

  - You are about to drop the column `brandId` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the `precos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "precos" DROP CONSTRAINT "precos_productId_fkey";

-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_brandId_fkey";

-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_categoryId_fkey";

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "brandId",
DROP COLUMN "categoryId",
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "category" TEXT NOT NULL;

-- DropTable
DROP TABLE "precos";

-- CreateTable
CREATE TABLE "precoVenda" (
    "productId" TEXT NOT NULL,
    "salePrice" DECIMAL(7,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "precoVenda_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "precoCompra" (
    "productId" TEXT NOT NULL,
    "purchasePrice" DECIMAL(7,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "precoCompra_pkey" PRIMARY KEY ("productId")
);

-- CreateIndex
CREATE INDEX "categorias_name_idx" ON "categorias"("name");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_brand_fkey" FOREIGN KEY ("brand") REFERENCES "marcas"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_category_fkey" FOREIGN KEY ("category") REFERENCES "categorias"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precoVenda" ADD CONSTRAINT "precoVenda_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precoCompra" ADD CONSTRAINT "precoCompra_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
