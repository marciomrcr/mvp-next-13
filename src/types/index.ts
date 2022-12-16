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
