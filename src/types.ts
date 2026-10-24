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
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  criadoEm: Date | null;
  atualizadoEm: Date | null;
};

type ItensCarrinho = {};

type Relatorio = {};

type Pedido = {
  id: number;
  clienteId: number;
  itens: Produto[];
  total: number;
  criadoEm: Date;
  atualizadoEm: Date | null;
};

export type { Carrinho, Cliente, Pedido, Produto, Relatorio };
