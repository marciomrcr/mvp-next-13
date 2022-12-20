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
CREATE TABLE "pessoa_fisica" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" CHAR(11),
    "identity" CHAR(10),
    "birthDate" TIMESTAMP(3),
    "whatsApp" CHAR(11),
    "phone" CHAR(11) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Ativo',
    "isSuplier" BOOLEAN NOT NULL DEFAULT false,
    "creditLimit" DECIMAL(7,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pessoa_fisica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pessoa_juridica" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactName" TEXT,
    "cnpj" CHAR(14),
    "whatsApp" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "instagram" TEXT,
    "stateRegistration" CHAR(14),
    "foundingDate" TIMESTAMP(3),
    "pixkey" TEXT,
    "creditLimit" DECIMAL(7,2),
    "isSuplier" BOOLEAN NOT NULL DEFAULT true,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "isCustomer" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pessoa_juridica_pkey" PRIMARY KEY ("id")
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
    "name" TEXT NOT NULL,
    "description" TEXT,
    "size" TEXT,
    "colors" TEXT,
    "brand" TEXT,
    "category" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Ativo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoque" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "min_stock" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoque_reservado" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estoque_reservado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movimento_estoque" (
    "id" TEXT NOT NULL,
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
    "physicalPersonId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "unitPrice" TEXT NOT NULL,
    "discount" TEXT NOT NULL,
    "totalPrice" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedido_compra" (
    "id" TEXT NOT NULL,
    "operationId" TEXT NOT NULL,
    "operationStatusId" TEXT NOT NULL,
    "peopleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateddAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedido_compra_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "pessoa_fisica_name_key" ON "pessoa_fisica"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_fisica_whatsApp_key" ON "pessoa_fisica"("whatsApp");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_fisica_phone_key" ON "pessoa_fisica"("phone");

-- CreateIndex
CREATE INDEX "pessoa_fisica_name_idx" ON "pessoa_fisica"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_name_key" ON "pessoa_juridica"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_cnpj_key" ON "pessoa_juridica"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_whatsApp_key" ON "pessoa_juridica"("whatsApp");

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_juridica_phone_key" ON "pessoa_juridica"("phone");

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
CREATE INDEX "categorias_name_idx" ON "categorias"("name");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_name_key" ON "produtos"("name");

-- CreateIndex
CREATE INDEX "produtos_name_idx" ON "produtos"("name");

-- CreateIndex
CREATE UNIQUE INDEX "estoque_productId_key" ON "estoque"("productId");

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
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_brand_fkey" FOREIGN KEY ("brand") REFERENCES "marcas"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_category_fkey" FOREIGN KEY ("category") REFERENCES "categorias"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque" ADD CONSTRAINT "estoque_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estoque_reservado" ADD CONSTRAINT "estoque_reservado_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimento_estoque" ADD CONSTRAINT "movimento_estoque_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_physicalPersonId_fkey" FOREIGN KEY ("physicalPersonId") REFERENCES "pessoa_fisica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_compra" ADD CONSTRAINT "pedido_compra_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "operacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_compra" ADD CONSTRAINT "pedido_compra_operationStatusId_fkey" FOREIGN KEY ("operationStatusId") REFERENCES "status_venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precoVenda" ADD CONSTRAINT "precoVenda_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precoCompra" ADD CONSTRAINT "precoCompra_productId_fkey" FOREIGN KEY ("productId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
