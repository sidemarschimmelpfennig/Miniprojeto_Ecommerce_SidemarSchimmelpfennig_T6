import { listarProdutos } from "./produtos";
import { Produto } from "./types";
import { logAmarelo, logAzul, logVerde } from "./utils/console";
import { prompt } from "./utils/prompt";

function relatorioProdutos(): void {
  console.log("\n");
  logAzul("          === RELATÓRIO DE PRODUTOS ===");

  const lista = listarProdutos();

  if (lista.length === 0) {
    logAmarelo("          Nenhum produto cadastrado.");
  } else {
    for (const produto of lista) {
      console.log("\n          ------------------------------");
      logVerde(`          ID: ${produto.id}`);
      console.log(`          Nome: ${produto.nome}`);
      console.log(`          Categoria: ${produto.categoria}`);
      console.log(
        `          Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")}`,
      );
    }
  }

  prompt("\n          Pressione Enter para voltar ao menu...");
}

function relatorioEstoque(): void {
  console.log("\n");
  logAzul("          === RELATÓRIO DE ESTOQUE ===");

  const lista = listarProdutos();

  if (lista.length === 0) {
    logAmarelo("          Nenhum produto cadastrado.");
  } else {
    for (const produto of lista) {
      console.log("\n          ------------------------------");
      logVerde(`          ID: ${produto.id}`);
      console.log(`          Produto: ${produto.nome}`);
      console.log(`          Estoque: ${produto.estoque}`);
    }
  }

  prompt("\n          Pressione Enter para voltar ao menu...");
}
function relatorioVendas(): void {}

function relatorioVendasPorCliente(): void {}

export {
  relatorioProdutos,
  relatorioEstoque,
  relatorioVendas,
  relatorioVendasPorCliente,
};
