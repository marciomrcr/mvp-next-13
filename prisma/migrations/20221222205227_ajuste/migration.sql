-- CreateTable
CREATE TABLE "Venda_Linha" (
    "id" TEXT NOT NULL,
    "vendasId" TEXT NOT NULL,
    "produto_ItemId" TEXT NOT NULL,
    "qtde" INTEGER NOT NULL,
    "preco" INTEGER NOT NULL,

    CONSTRAINT "Venda_Linha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto_Item" (
    "id" TEXT NOT NULL,
    "qtde" INTEGER NOT NULL,
    "preco" INTEGER NOT NULL,
    "produtosId" TEXT NOT NULL,

    CONSTRAINT "Produto_Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Venda_Linha" ADD CONSTRAINT "Venda_Linha_produto_ItemId_fkey" FOREIGN KEY ("produto_ItemId") REFERENCES "Produto_Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda_Linha" ADD CONSTRAINT "Venda_Linha_vendasId_fkey" FOREIGN KEY ("vendasId") REFERENCES "Vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto_Item" ADD CONSTRAINT "Produto_Item_produtosId_fkey" FOREIGN KEY ("produtosId") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
