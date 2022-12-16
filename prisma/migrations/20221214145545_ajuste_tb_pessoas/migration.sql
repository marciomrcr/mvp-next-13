/*
  Warnings:

  - The primary key for the `filial` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `branchOfficeId` on the `filial` table. All the data in the column will be lost.
  - The primary key for the `pessoa_fisica` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `physicalPersonId` on the `pessoa_fisica` table. All the data in the column will be lost.
  - The primary key for the `pessoa_juridica` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `legalPersonId` on the `pessoa_juridica` table. All the data in the column will be lost.
  - You are about to drop the `PeopleType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `consumidor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fornecedor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pessoas` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `pessoa_fisica` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `pessoa_juridica` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `filial` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `legalPersonId` to the `filial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `pessoa_fisica` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `pessoa_juridica` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "consumidor" DROP CONSTRAINT "consumidor_customerId_fkey";

-- DropForeignKey
ALTER TABLE "estoque" DROP CONSTRAINT "estoque_branchOfficeId_fkey";

-- DropForeignKey
ALTER TABLE "filial" DROP CONSTRAINT "filial_branchOfficeId_fkey";

-- DropForeignKey
ALTER TABLE "fornecedor" DROP CONSTRAINT "fornecedor_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "movimento_estoque" DROP CONSTRAINT "movimento_estoque_branchOfficeId_fkey";

-- DropForeignKey
ALTER TABLE "pedido_compra" DROP CONSTRAINT "pedido_compra_branchOfficeId_fkey";

-- DropForeignKey
ALTER TABLE "pedido_compra" DROP CONSTRAINT "pedido_compra_peopleId_fkey";

-- DropForeignKey
ALTER TABLE "pessoa_fisica" DROP CONSTRAINT "pessoa_fisica_physicalPersonId_fkey";

-- DropForeignKey
ALTER TABLE "pessoa_juridica" DROP CONSTRAINT "pessoa_juridica_legalPersonId_fkey";

-- DropForeignKey
ALTER TABLE "pessoas" DROP CONSTRAINT "pessoas_peopleTypeId_fkey";

-- DropForeignKey
ALTER TABLE "venda" DROP CONSTRAINT "venda_branchOfficeId_fkey";

-- DropForeignKey
ALTER TABLE "venda" DROP CONSTRAINT "venda_peopleId_fkey";

-- AlterTable
ALTER TABLE "filial" DROP CONSTRAINT "filial_pkey",
DROP COLUMN "branchOfficeId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "legalPersonId" TEXT NOT NULL,
ADD CONSTRAINT "filial_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "pessoa_fisica" DROP CONSTRAINT "pessoa_fisica_pkey",
DROP COLUMN "physicalPersonId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "isSuplier" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "limit" TEXT,
ADD COLUMN     "phone" CHAR(11),
ALTER COLUMN "birthDate" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "whatsApp" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pessoa_juridica" DROP CONSTRAINT "pessoa_juridica_pkey",
DROP COLUMN "legalPersonId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "isCustomer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSuplier" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "foundingDate" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "pessoa_juridica_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "PeopleType";

-- DropTable
DROP TABLE "consumidor";

-- DropTable
DROP TABLE "fornecedor";

-- DropTable
DROP TABLE "pessoas";

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_fisica_phone_key" ON "pessoa_fisica"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_phone_key" ON "pessoa_juridica"("phone");

-- AddForeignKey
ALTER TABLE "filial" ADD CONSTRAINT "filial_legalPersonId_fkey" FOREIGN KEY ("legalPersonId") REFERENCES "pessoa_juridica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque" ADD CONSTRAINT "estoque_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "filial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimento_estoque" ADD CONSTRAINT "movimento_estoque_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "filial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "filial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_compra" ADD CONSTRAINT "pedido_compra_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "filial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
