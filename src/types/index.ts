export type ClientePF = {
  id?: string;
  name: string;
  cpf?: string;
  identity?: string;
  birthDate?: Date;
  whatsApp?: string;
  phone?: string;
  creditLimit?: number;
};

export type ClientePJ = {
  id?: string;
  name: string;
  contactName?: String;
  cnpj?: string;
  stateRegistration?: string;
  foundingDate?: Date;
  pixkey?: string;
  whatsApp?: string;
  phone: string;
  email?: string;
  instagram?: string;
  creditLimit?: number;
  isCustomer?: boolean;
  status?: boolean;
};

export type Produtos = {
  id: string;
  name: string;
  description?: string;
  category: string;
  brand?: string;
  size?: string;
  colors?: string;
  price?: string;
};

export type ProdutosCart = {
  id: string;
  produtoNome: string;
  marca: string;
  categoria: string;
  category: string;
  preco: number;
  imagem?: string;
};

export type EstoqueProduto = {
  id?: string;
  produto?: {
    productName: string;
  };
  qtde: number;
  produtosId: string;
  precoCusto?: number;
};

export type Estoque = {
  id?: string;
  product?: {
    name: string;
  };
  productId: string;
  amount: number;
  min_stock?: number;
};

export type Receitas = {
  id: string;
  title: string;
  description: string;
};

export type ItemVenda = {
  orderSaleId: string;
  productId: string;
  mount: number;
  unitPrice: number;
  discount: number;
  sum_total: number;
};
export type Venda = {
  id?: string;
  cliente?: { name: string | undefined };
  clienteId: string;
  product?: { name: string | undefined };

  cartId?: string;
  Cart_Items?: {
    desconto: number;
  };
  cart?: {
    qtde_Items: number;
    total: number;
  };
  productId: string;
  qtde: number;
  preco: number;
  desconto: number;
  subTotal: number;
};
export type VendaCart = {
  id?: string;
  physicalPerson?: { name: string };
  clienteId: string;
  product?: { name: string };
  cartId?: string;
  productId: string;
  qtde: number;
  preco: number;
  desconto: number;
  subTotal: number;
  qtde_Items: number;
  total: number;
};
