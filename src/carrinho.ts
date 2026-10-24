import { finalizarPedido } from "./pedidos";
import { verProduto } from "./produtos";
import type { ItemCarrinho } from "./types";
import { logAmarelo, logAzul, logVerde, logVermelho } from "./utils/console";
import { promptCinza, promptVerde } from "./utils/prompt";
import promptSync = require("prompt-sync");
const prompt = promptSync({ sigint: true });

const carrinho: ItemCarrinho[] = [];

function adicionarAoCarrinho(): void {
  logAzul("\n         === ADICIONAR AO CARRINHO ===");

  const produtoId = Number(prompt("          Digite o ID do produto: "));
  const produto = verProduto(produtoId);

  if (typeof produto === "string") {
    logVerde("          Produto não encontrado.");
    return;
  }

  const quantidade = Number(prompt("          Digite a quantidade: "));

  if (!Number.isInteger(quantidade) || quantidade <= 0) {
    logVermelho("     Quantidade inválida.");
    return;
  }

  const itemExistente = carrinho.find((item) => item.produtoId === produtoId);

  const quantidadeAtual = itemExistente ? itemExistente.quantidade : 0;

  if (quantidadeAtual + quantidade > produto.estoque) {
    logVermelho("          Estoque insuficiente.");
    logVerde(`          Estoque disponível: ${produto.estoque}`);
    return;
  }

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    carrinho.push({
      produtoId,
      quantidade,
    });
  }

  logVerde(`          ${produto.nome} adicionado ao carrinho.`);
  prompt("          Pressione Enter para voltar...");
  return;
}

function removerDoCarrinho(): void {
  logAzul("\n          === REMOVER DO CARRINHO ===");

  if (carrinho.length === 0) {
    logVerde("\n          O carrinho está vazio.");
    prompt("          Pressione Enter para voltar...");
    return;
  }

  listarCarrinho();

  const produtoId = Number(
    prompt("\n          Digite o ID do produto que deseja remover: "),
  );

  if (!Number.isInteger(produtoId) || produtoId <= 0) {
    console.log("\nErro: informe um ID válido.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  const indice = carrinho.findIndex((item) => item.produtoId === produtoId);

  if (indice === -1) {
    logVermelho("\n           Erro: produto não encontrado no carrinho.");
    promptCinza("          Pressione Enter para voltar...");
    return;
  }

  const item = carrinho[indice];

  if (!item) {
    logVermelho("\n          Erro: item não encontrado.");
    promptCinza("          Pressione Enter para voltar...");
    return;
  }

  const produto = verProduto(item.produtoId);

  const confirmar = promptCinza(
    `\n        Deseja realmente remover ${
      typeof produto === "string" ? "este produto" : produto.nome
    } do carrinho? (s/n): `,
  )
    .trim()
    .toLowerCase();

  if (confirmar !== "s") {
    logVerde("\n          Remoção cancelada.");
    prompt("         Pressione Enter para voltar...");
    return;
  }

  carrinho.splice(indice, 1);

  logVerde("\n          Produto removido do carrinho com sucesso!");
  prompt("         Pressione Enter para voltar ao menu...");
}

function alterarQuantidade(): void {
  logAzul("\n          === ALTERAR QUANTIDADE ===");

  const produtoId = Number(prompt("          Digite o ID do produto: "));

  const item = carrinho.find((item) => item.produtoId === produtoId);

  if (!item) {
    logVermelho("          Produto não encontrado no carrinho.");
    prompt("          Pressione Enter para voltar...");
    return;
  }

  const produto = verProduto(produtoId);

  if (typeof produto === "string") {
    logVermelho("          Produto não encontrado no catálogo.");
    prompt("          Pressione Enter para voltar...");
    return;
  }

  const quantidade = Number(prompt("          Digite a nova quantidade: "));

  if (!Number.isInteger(quantidade) || quantidade <= 0) {
    logVermelho("          Quantidade inválida.");
    return;
  }

  if (quantidade > produto.estoque) {
    logVermelho("          Estoque insuficiente.");
    logAmarelo(`          Estoque disponível: ${produto.estoque}`);
    return;
  }

  item.quantidade = quantidade;

  logVerde("          Quantidade alterada com sucesso!");
}

function listarCarrinho(): ItemCarrinho[] {
  return carrinho;
}

function calcularSubtotal(produtoId: number): number {
  const item = carrinho.find((item) => item.produtoId === produtoId);

  if (!item) {
    return 0;
  }

  const produto = verProduto(produtoId);

  if (typeof produto === "string") {
    return 0;
  }

  return produto.preco * item.quantidade;
}

function calcularTotalCarrinho(): number {
  let total = 0;

  for (const item of carrinho) {
    total += calcularSubtotal(item.produtoId);
  }

  return total;
}

function mostrarCarrinho(): void {
  logAzul("\n          === CARRINHO DE COMPRAS ===");
  const carrinho = listarCarrinho();
  if (carrinho.length === 0) {
    logVermelho("\n          O carrinho está vazio.");
    promptCinza("\n          Pressione Enter para voltar ao menu...");
    return;
  }

  logVerde("\n          === ITENS DO CARRINHO ===");

  for (const item of carrinho) {
    const produto = verProduto(item.produtoId);

    if (typeof produto === "string") {
      logVermelho(
        `\n          Erro: produto ID ${item.produtoId} não encontrado.`,
      );
      continue;
    }

    const subtotal = produto.preco * item.quantidade;

    console.log("\n          ------------------------------");
    console.log(`          ID: ${produto.id}`);
    console.log(`          Produto: ${produto.nome}`);
    console.log(`          Categoria: ${produto.categoria}`);
    console.log(
      `          Preço unitário: R$ ${produto.preco.toFixed(2).replace(".", ",")}`,
    );
    console.log(`          Quantidade: ${item.quantidade}`);
    console.log(
      `          Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}`,
    );
  }

  const total = calcularTotalCarrinho();

  logAmarelo("\n          ==============================");
  logAmarelo(
    `            TOTAL DA COMPRA: R$ ${total.toFixed(2).replace(".", ",")}`,
  );
  logAmarelo("          ==============================");

  console.log("\n          1 - Finalizar pedido");
  logVermelho("          0 - Voltar");

  const opcao = promptVerde("\n          Escolha uma opção: ").trim();

  switch (opcao) {
    case "1": {
      const clienteId = Number(
        promptVerde("          Digite o ID do cliente: "),
      );

      finalizarPedido(clienteId);
      break;
    }

    case "0":
      break;

    default:
      logVermelho("          Opção inválida.");
      promptCinza("          Pressione Enter para continuar...");
  }
}

function limparCarrinho(): void {
  carrinho.length = 0;
}

export {
  adicionarAoCarrinho,
  removerDoCarrinho,
  alterarQuantidade,
  listarCarrinho,
  calcularSubtotal,
  calcularTotalCarrinho,
  mostrarCarrinho,
  limparCarrinho,
};
