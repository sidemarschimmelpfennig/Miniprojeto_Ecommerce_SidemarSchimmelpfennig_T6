import { verProduto } from "./produtos";
import type { ItemCarrinho } from "./types";
import {
  logAmarelo,
  logAzul,
  logCinza,
  logVerde,
  logVermelho,
} from "./utils/console";
import { promptCinza } from "./utils/prompt";
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

  logVerde(`     ${produto.nome} adicionado ao carrinho.`);
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
    return;
  }

  const produto = verProduto(produtoId);

  if (typeof produto === "string") {
    logVermelho("          Produto não encontrado no catálogo.");
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
function listarCarrinho(): void {
  // TODO: Listar produtos do carrinho
}

function calcularSubtotal(): number {
  // TODO: Calcular subtotal de um produto
  return 0;
}

function calcularTotalCarrinho(): number {
  // TODO: Calcular valor total do carrinho
  return 0;
}

export {
  adicionarAoCarrinho,
  removerDoCarrinho,
  alterarQuantidade,
  listarCarrinho,
  calcularSubtotal,
  calcularTotalCarrinho,
};
