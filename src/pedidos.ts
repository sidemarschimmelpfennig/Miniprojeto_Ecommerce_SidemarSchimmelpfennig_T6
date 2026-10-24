import { Pedido } from "./types";

const pedidos: Pedido[] = [];

function finalizarPedido(clienteId: number): Pedido | null {
  console.log(`Finalizando pedido para o cliente ${clienteId}...`);

  return null;
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

export {
  finalizarPedido,
  listarPedidos,
  listarPedidosPorCliente,
  buscarPedidoPorId,
};
