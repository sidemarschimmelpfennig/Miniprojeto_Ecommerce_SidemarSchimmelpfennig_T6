import { listarClientes } from "./clientes";
import { listarPedidos } from "./pedidos";
import { listarProdutos } from "./produtos";
import {
  logAmarelo,
  logAzul,
  logCinza,
  logVerde,
  logVermelho,
} from "./utils/console";
import { promptCinza } from "./utils/prompt";

function relatorioProdutos(): void {
  logAzul("\n          === RELATÓRIO DE PRODUTOS ===");

  const lista = listarProdutos();

  if (lista.length === 0) {
    logAmarelo("          Nenhum produto cadastrado.");
    promptCinza("\n          Pressione Enter para voltar ao menu...");
    return;
  }

  const valorTotalCatalogo = lista.reduce((acc, p) => acc + p.preco, 0);
  const precoMedio = valorTotalCatalogo / lista.length;

  logCinza(`          Total de itens cadastrados: ${lista.length}`);
  logCinza(
    `          Preço médio no catálogo: R$ ${precoMedio.toFixed(2).replace(".", ",")}`,
  );

  for (const produto of lista) {
    console.log("\n          ----------------------------------------");
    logVerde(`          Produto ID: ${produto.id}`);
    console.log(`          Nome: ${produto.nome}`);
    console.log(`          Categoria: ${produto.categoria}`);
    console.log(`          Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")}`);
    console.log(`          Estoque: ${produto.estoque} unidade(s)`);
  }
  console.log("          ----------------------------------------");

  promptCinza("\n          Pressione Enter para voltar ao menu...");
}

function relatorioEstoque(): void {
  logAzul("\n          === RELATÓRIO DE ESTOQUE ===");

  const lista = listarProdutos();

  if (lista.length === 0) {
    logAmarelo("          Nenhum produto cadastrado.");
    promptCinza("\n          Pressione Enter para voltar ao menu...");
    return;
  }

  const totalUnidades = lista.reduce((acc, p) => acc + p.estoque, 0);
  const valorPatrimonial = lista.reduce(
    (acc, p) => acc + p.preco * p.estoque,
    0,
  );

  logCinza(`          Total de unidades em estoque: ${totalUnidades}`);
  logCinza(
    `          Valor patrimonial do estoque: R$ ${valorPatrimonial.toFixed(2).replace(".", ",")}`,
  );

  for (const produto of lista) {
    console.log("\n          ----------------------------------------");
    logVerde(`          Produto ID: ${produto.id}`);
    console.log(`          Produto: ${produto.nome}`);
    console.log(`          Categoria: ${produto.categoria}`);
    if (produto.estoque === 0) {
      logVermelho(`          Estoque: ESGOTADO (0 unidades)`);
    } else if (produto.estoque <= 5) {
      logAmarelo(`          Estoque: BAIXO (${produto.estoque} unidades)`);
    } else {
      console.log(`          Estoque: ${produto.estoque} unidades`);
    }
    console.log(
      `          Valor total em estoque: R$ ${(produto.preco * produto.estoque).toFixed(2).replace(".", ",")}`,
    );
  }
  console.log("          ----------------------------------------");

  promptCinza("\n          Pressione Enter para voltar ao menu...");
}

function relatorioVendas(): void {
  logAzul("\n          === RELATÓRIO DE VENDAS ===");

  const pedidos = listarPedidos();

  if (pedidos.length === 0) {
    logAmarelo("          Nenhum pedido registrado até o momento.");
    promptCinza("\n          Pressione Enter para voltar ao menu...");
    return;
  }

  const faturamentoTotal = pedidos.reduce((acc, p) => acc + p.total, 0);
  const ticketMedio = faturamentoTotal / pedidos.length;
  const totalItensVendidos = pedidos.reduce(
    (acc, p) => acc + p.itens.reduce((sum, item) => sum + item.quantidade, 0),
    0,
  );

  logCinza(`          Total de pedidos realizados: ${pedidos.length}`);
  logCinza(`          Total de itens vendidos: ${totalItensVendidos}`);
  logCinza(
    `          Ticket médio por pedido: R$ ${ticketMedio.toFixed(2).replace(".", ",")}`,
  );
  logAmarelo(
    `          Faturamento Total: R$ ${faturamentoTotal.toFixed(2).replace(".", ",")}`,
  );

  for (const pedido of pedidos) {
    console.log("\n          ----------------------------------------");
    logVerde(`          Pedido #${pedido.id} | Cliente ID: ${pedido.clienteId}`);
    console.log(`          Data: ${pedido.data.toLocaleString("pt-BR")}`);
    console.log(`          Qtd de Itens: ${pedido.itens.length}`);
    logAmarelo(`          Total: R$ ${pedido.total.toFixed(2).replace(".", ",")}`);
  }
  console.log("          ----------------------------------------");

  promptCinza("\n          Pressione Enter para voltar ao menu...");
}

function relatorioVendasPorCliente(): void {
  logAzul("\n          === RELATÓRIO DE VENDAS POR CLIENTE ===");

  const clientes = listarClientes();
  const pedidos = listarPedidos();

  if (clientes.length === 0) {
    logAmarelo("          Nenhum cliente cadastrado.");
    promptCinza("\n          Pressione Enter para voltar ao menu...");
    return;
  }

  // Agrupar pedidos por cliente e calcular totais com map e reduce
  const relatorio = clientes.map((cliente) => {
    const pedidosCliente = pedidos.filter((p) => p.clienteId === cliente.id);
    const totalGasto = pedidosCliente.reduce((acc, p) => acc + p.total, 0);
    return {
      cliente,
      pedidos: pedidosCliente,
      totalGasto,
    };
  });

  // Ordenar pelos clientes com maior faturamento
  relatorio.sort((a, b) => b.totalGasto - a.totalGasto);

  for (const item of relatorio) {
    console.log("\n          ----------------------------------------");
    logVerde(`          Cliente: ${item.cliente.nome} (ID: ${item.cliente.id})`);
    console.log(`          E-mail: ${item.cliente.email}`);
    console.log(`          Pedidos realizados: ${item.pedidos.length}`);
    if (item.pedidos.length > 0) {
      logAmarelo(
        `          Total investido: R$ ${item.totalGasto.toFixed(2).replace(".", ",")}`,
      );
    } else {
      logCinza(`          Status: Nenhum pedido realizado`);
    }
  }
  console.log("          ----------------------------------------");

  promptCinza("\n          Pressione Enter para voltar ao menu...");
}

export {
  relatorioProdutos,
  relatorioEstoque,
  relatorioVendas,
  relatorioVendasPorCliente,
};
