import type { Cliente, Pedido, Produto } from "./types";
import { listarClientes } from "./clientes";
import { listarProdutos } from "./produtos";
import {
  listarCarrinho,
  calcularTotalCarrinho,
  limparCarrinho,
} from "./carrinho";
import {
  logAmarelo,
  logVerde,
  logVermelho,
} from "./utils/console";
import { prompt } from "./utils/prompt";

const pedidos: Pedido[] = [
  {
    id: 1,
    clienteId: 1,
    itens: [
      {
        produtoId: 1,
        nome: "Teclado Mecânico",
        quantidade: 2,
        precoUnitario: 199.9,
        subtotal: 399.8,
      },
      {
        produtoId: 2,
        nome: "Mouse Gamer",
        quantidade: 1,
        precoUnitario: 89.9,
        subtotal: 89.9,
      },
    ],
    total: 489.7,
    data: new Date("2026-10-20T14:30:00"),
  },
  {
    id: 2,
    clienteId: 2,
    itens: [
      {
        produtoId: 3,
        nome: "Monitor 24 polegadas",
        quantidade: 1,
        precoUnitario: 899.9,
        subtotal: 899.9,
      },
    ],
    total: 899.9,
    data: new Date("2026-10-21T10:15:00"),
  },
  {
    id: 3,
    clienteId: 3,
    itens: [
      {
        produtoId: 4,
        nome: "Headset Gamer",
        quantidade: 2,
        precoUnitario: 149.9,
        subtotal: 299.8,
      },
      {
        produtoId: 5,
        nome: "Webcam Full HD",
        quantidade: 1,
        precoUnitario: 129.9,
        subtotal: 129.9,
      },
    ],
    total: 429.7,
    data: new Date("2026-10-22T16:45:00"),
  },
];

function finalizarPedido(clienteId: number): Pedido | null {
  logAmarelo("\n          === FINALIZAR PEDIDO ===");

  const clientes = listarClientes();
  const cliente = clientes.find((cliente: Cliente) => cliente.id === clienteId);

  if (!cliente) {
    logVermelho("Cliente não encontrado.");
    return null;
  }

  const carrinho = listarCarrinho();

  if (carrinho.length === 0) {
    logVermelho("Não é possível finalizar um pedido sem itens.");
    return null;
  }

  const produtos = listarProdutos();

  // Validar todos os itens antes de alterar estoque ou registrar o pedido.
  const itensPedido = [];

  for (const item of carrinho) {
    const produto = produtos.find(
      (produto: Produto) => produto.id === item.produtoId,
    );

    if (!produto) {
      logVermelho(`Produto ID ${item.produtoId} não encontrado.`);
      return null;
    }

    if (!Number.isInteger(item.quantidade) || item.quantidade <= 0) {
      logVermelho(`Quantidade inválida para ${produto.nome}.`);
      return null;
    }

    if (produto.estoque < item.quantidade) {
      logVermelho(`Estoque insuficiente para ${produto.nome}.`);
      logAmarelo(`Estoque disponível: ${produto.estoque}`);
      return null;
    }

    itensPedido.push({
      produtoId: produto.id,
      nome: produto.nome,
      quantidade: item.quantidade,
      precoUnitario: produto.preco,
      subtotal: produto.preco * item.quantidade,
    });
  }

  const total = calcularTotalCarrinho();

  const novoPedido: Pedido = {
    id:
      pedidos.length > 0
        ? Math.max(...pedidos.map((pedido) => pedido.id)) + 1
        : 1,
    clienteId,
    itens: itensPedido,
    total,
    data: new Date(),
  };

  // Somente depois de validar todos os itens, atualizar o estoque.
  for (const item of carrinho) {
    const produto = produtos.find((produto) => produto.id === item.produtoId);

    if (produto) {
      produto.estoque -= item.quantidade;
    }
  }

  pedidos.push(novoPedido);
  limparCarrinho();

  logVerde("\n          Pedido finalizado com sucesso!");
  exibirDetalhesPedido(novoPedido);
  prompt("          Pressione Enter para voltar ao menu...");

  return novoPedido;
}

function listarPedidos(): Pedido[] {
  return pedidos;
}

function listarPedidosPorCliente(clienteId: number): Pedido[] {
  return pedidos.filter((pedido) => pedido.clienteId === clienteId);
}

function buscarPedidoPorId(id: number): Pedido | undefined {
  return pedidos.find((pedido) => pedido.id === id);
}

function exibirDetalhesPedido(pedido: Pedido): void {
  console.log("\n          ----------------------------------------");
  logVerde(`          Pedido ID: ${pedido.id}`);
  console.log(`          Cliente ID: ${pedido.clienteId}`);
  console.log(`          Data: ${pedido.data.toLocaleString("pt-BR")}`);
  console.log("          Itens do Pedido:");
  pedido.itens.forEach((item) => {
    console.log(
      `            - [ID ${item.produtoId}] ${item.nome} | Qtd: ${item.quantidade} | Unit: R$ ${item.precoUnitario.toFixed(2).replace(".", ",")} | Subtotal: R$ ${item.subtotal.toFixed(2).replace(".", ",")}`,
    );
  });
  logAmarelo(`          Total: R$ ${pedido.total.toFixed(2).replace(".", ",")}`);
  console.log("          ----------------------------------------");
}

export {
  finalizarPedido,
  listarPedidos,
  listarPedidosPorCliente,
  buscarPedidoPorId,
  exibirDetalhesPedido,
};

