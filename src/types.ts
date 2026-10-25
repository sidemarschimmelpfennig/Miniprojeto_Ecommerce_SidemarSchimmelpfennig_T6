export type Produto = {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
};

export type Cliente = {
  id: number;
  nome: string;
  email: string;
};

export type ItemCarrinho = {
  produtoId: number;
  quantidade: number;
};

export type Pedido = {
  id: number;
  clienteId: number;
  itens: {
    produtoId: number;
    nome: string;
    quantidade: number;
    precoUnitario: number;
    subtotal: number;
  }[];
  total: number;
  data: Date;
};
