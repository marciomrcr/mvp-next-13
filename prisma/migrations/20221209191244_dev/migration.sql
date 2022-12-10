-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Ativo', 'Desativado');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "status" "Status" NOT NULL DEFAULT 'Ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoas" (
    "id" TEXT NOT NULL,
    "peopleTypeId" TEXT NOT NULL,

    CONSTRAINT "pessoas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeopleType" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "PeopleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filial" (
    "branchOfficeId" TEXT NOT NULL,

    CONSTRAINT "filial_pkey" PRIMARY KEY ("branchOfficeId")
);

-- CreateTable
CREATE TABLE "fornecedor" (
    "supplierId" TEXT NOT NULL,

    CONSTRAINT "fornecedor_pkey" PRIMARY KEY ("supplierId")
);

-- CreateTable
CREATE TABLE "consumidor" (
    "customerId" TEXT NOT NULL,

    CONSTRAINT "consumidor_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "pessoa_fisica" (
    "physicalPersonId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" CHAR(11),
    "identity" CHAR(10),
    "birthDate" DATE,
    "whatsApp" CHAR(11) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Ativo',
    "creditLimit" DECIMAL(7,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pessoa_fisica_pkey" PRIMARY KEY ("physicalPersonId")
);

-- CreateTable
CREATE TABLE "pessoa_juridica" (
    "legalPersonId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactName" TEXT,
    "cnpj" CHAR(14),
    "whatsApp" TEXT,
    "email" TEXT NOT NULL,
    "instagram" TEXT,
    "stateRegistration" CHAR(14),
    "foundingDate" DATE NOT NULL,
    "pixkey" TEXT,
    "creditLimit" DECIMAL(7,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Ativo',

    CONSTRAINT "pessoa_juridica_pkey" PRIMARY KEY ("legalPersonId")
);

-- CreateTable
CREATE TABLE "marcas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer" TEXT,
    "description" TEXT,
    "status" "Status" NOT NULL DEFAULT 'Ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "marcas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL DEFAULT 'Ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "size" TEXT,
    "colors" TEXT,
    "status" "Status" NOT NULL DEFAULT 'Ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoque" (
    "branchOfficeId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "min_stock" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estoque_pkey" PRIMARY KEY ("branchOfficeId","productId")
);

-- CreateTable
CREATE TABLE "estoque_reservado" (
    "branchOfficeId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estoque_reservado_pkey" PRIMARY KEY ("branchOfficeId","productId")
);

-- CreateTable
CREATE TABLE "movimento_estoque" (
    "id" TEXT NOT NULL,
    "branchOfficeId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "entryOutput" CHAR(1) NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movimento_estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operacoes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "operacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_venda" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "status_venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venda" (
    "id" TEXT NOT NULL,
    "operationId" TEXT NOT NULL,
    "operationStatusId" TEXT NOT NULL,
    "branchOfficeId" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedido_compra" (
    "id" TEXT NOT NULL,
    "operationId" TEXT NOT NULL,
    "operationStatusId" TEXT NOT NULL,
    "branchOfficeId" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedido_compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "iten_Pedido_venda" (
    "orderSaleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "mount" INTEGER NOT NULL,
    "unitPrice" DECIMAL(7,2) NOT NULL,
    "discount" DECIMAL(7,2) NOT NULL DEFAULT 0,
    "sum_total" DECIMAL(7,2) NOT NULL,

    CONSTRAINT "iten_Pedido_venda_pkey" PRIMARY KEY ("orderSaleId","productId")
);

-- CreateTable
CREATE TABLE "precos" (
    "productId" TEXT NOT NULL,
    "PurchasePrice" DECIMAL(7,2) NOT NULL,
    "saleprice" DECIMAL(7,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "precos_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "receitas" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "despesas" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL DEFAULT 'Ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "despesas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "usuarios_name_idx" ON "usuarios"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PeopleType_description_key" ON "PeopleType"("description");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_fisica_name_key" ON "pessoa_fisica"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_fisica_whatsApp_key" ON "pessoa_fisica"("whatsApp");

-- CreateIndex
CREATE INDEX "pessoa_fisica_name_idx" ON "pessoa_fisica"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_name_key" ON "pessoa_juridica"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_cnpj_key" ON "pessoa_juridica"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_whatsApp_key" ON "pessoa_juridica"("whatsApp");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_email_key" ON "pessoa_juridica"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_instagram_key" ON "pessoa_juridica"("instagram");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_stateRegistration_key" ON "pessoa_juridica"("stateRegistration");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_pixkey_key" ON "pessoa_juridica"("pixkey");

-- CreateIndex
CREATE INDEX "pessoa_juridica_name_idx" ON "pessoa_juridica"("name");

-- CreateIndex
CREATE UNIQUE INDEX "marcas_name_key" ON "marcas"("name");

-- CreateIndex
CREATE INDEX "marcas_name_idx" ON "marcas"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_name_key" ON "categorias"("name");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_name_key" ON "produtos"("name");

-- CreateIndex
CREATE INDEX "produtos_name_idx" ON "produtos"("name");

-- CreateIndex
CREATE UNIQUE INDEX "operacoes_title_key" ON "operacoes"("title");

-- CreateIndex
CREATE INDEX "operacoes_title_idx" ON "operacoes"("title");

-- CreateIndex
CREATE UNIQUE INDEX "receitas_title_key" ON "receitas"("title");

-- CreateIndex
CREATE INDEX "receitas_title_idx" ON "receitas"("title");

-- CreateIndex
CREATE UNIQUE INDEX "despesas_title_key" ON "despesas"("title");

-- CreateIndex
CREATE INDEX "despesas_title_idx" ON "despesas"("title");

-- AddForeignKey
ALTER TABLE "pessoas" ADD CONSTRAINT "pessoas_peopleTypeId_fkey" FOREIGN KEY ("peopleTypeId") REFERENCES "PeopleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filial" ADD CONSTRAINT "filial_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fornecedor" ADD CONSTRAINT "fornecedor_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumidor" ADD CONSTRAINT "consumidor_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa_fisica" ADD CONSTRAINT "pessoa_fisica_physicalPersonId_fkey" FOREIGN KEY ("physicalPersonId") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa_juridica" ADD CONSTRAINT "pessoa_juridica_legalPersonId_fkey" FOREIGN KEY ("legalPersonId") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "marcas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque" ADD CONSTRAINT "estoque_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque" ADD CONSTRAINT "estoque_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "filial"("branchOfficeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque_reservado" ADD CONSTRAINT "estoque_reservado_branchOfficeId_productId_fkey" FOREIGN KEY ("branchOfficeId", "productId") REFERENCES "estoque"("branchOfficeId", "productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimento_estoque" ADD CONSTRAINT "movimento_estoque_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "filial"("branchOfficeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimento_estoque" ADD CONSTRAINT "movimento_estoque_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "filial"("branchOfficeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "operacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_operationStatusId_fkey" FOREIGN KEY ("operationStatusId") REFERENCES "status_venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_compra" ADD CONSTRAINT "pedido_compra_branchOfficeId_fkey" FOREIGN KEY ("branchOfficeId") REFERENCES "filial"("branchOfficeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_compra" ADD CONSTRAINT "pedido_compra_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "operacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_compra" ADD CONSTRAINT "pedido_compra_operationStatusId_fkey" FOREIGN KEY ("operationStatusId") REFERENCES "status_venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_compra" ADD CONSTRAINT "pedido_compra_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES "pessoas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "iten_Pedido_venda" ADD CONSTRAINT "iten_Pedido_venda_orderSaleId_fkey" FOREIGN KEY ("orderSaleId") REFERENCES "venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "iten_Pedido_venda" ADD CONSTRAINT "iten_Pedido_venda_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precos" ADD CONSTRAINT "precos_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
