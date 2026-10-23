type Carrinho = {};

type Cliente = {
  id: number;
  nome: string;
  idade: number;
  email: string;
  createdAt: Date;
  updatedAt?: Date | null;
};

type Produto = {
  nome: string;
  quantidade: number;
};

type Relatorio = {};

type Pedido = {};

export type { Carrinho, Cliente, Pedido, Produto, Relatorio };
