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
  physicalPerson?: { name: string };
  product?: { name: string };
  physicalPersonId: string;
  productId: string;
  amount: string;
  unitPrice: string;
  discount?: string;
  totalPrice: string;
};
export type VendaNova = {
  id?: string;
  physicalPerson?: { name: string };
  clienteId: string;
  product?: { name: string }[];
  productId: string[];
  qtde: number[];
  preco: number[];
  desconto?: number[];
  subTotal: number[];
  total: number;
};
