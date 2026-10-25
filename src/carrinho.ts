import { finalizarPedido } from "./pedidos";
import { buscarProdutoPorId } from "./produtos";
import type { ItemCarrinho } from "./types";
import { logAmarelo, logAzul, logVerde, logVermelho } from "./utils/console";
import { prompt, promptCinza, promptVerde } from "./utils/prompt";

const carrinho: ItemCarrinho[] = [];

function adicionarAoCarrinho(): void {
  logAzul("\n          === ADICIONAR AO CARRINHO ===");

  const produtoId = Number(prompt("          Digite o ID do produto: "));

  if (!Number.isInteger(produtoId) || produtoId <= 0) {
    logVermelho("          Erro: informe um ID válido.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const produto = buscarProdutoPorId(produtoId);

  if (!produto) {
    logVermelho("          Erro: produto não encontrado.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const quantidade = Number(prompt("          Digite a quantidade: "));

  if (!Number.isInteger(quantidade) || quantidade <= 0) {
    logVermelho(
      "          Erro: quantidade inválida (deve ser um inteiro maior que zero).",
    );
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const itemExistente = carrinho.find((item) => item.produtoId === produtoId);
  const quantidadeAtual = itemExistente ? itemExistente.quantidade : 0;

  if (quantidadeAtual + quantidade > produto.estoque) {
    logVermelho("          Erro: estoque insuficiente.");
    logAmarelo(
      `          Estoque disponível: ${produto.estoque} (no carrinho: ${quantidadeAtual})`,
    );
    promptCinza("\n          Pressione Enter para voltar...");
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

  logVerde(
    `\n          ${produto.nome} (x${quantidade}) adicionado ao carrinho com sucesso!`,
  );
  promptCinza("\n          Pressione Enter para voltar...");
}

function removerDoCarrinho(): void {
  logAzul("\n          === REMOVER DO CARRINHO ===");

  if (carrinho.length === 0) {
    logAmarelo("\n          O carrinho está vazio.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const produtoId = Number(
    prompt("          Digite o ID do produto que deseja remover: "),
  );

  if (!Number.isInteger(produtoId) || produtoId <= 0) {
    logVermelho("          Erro: informe um ID válido.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const indice = carrinho.findIndex((item) => item.produtoId === produtoId);

  if (indice === -1) {
    logVermelho("          Erro: produto não encontrado no carrinho.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const item = carrinho[indice];

  if (!item) {
    logVermelho("          Erro: item não encontrado no carrinho.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const produto = buscarProdutoPorId(produtoId);
  const nomeProduto = produto ? produto.nome : `Produto ID ${produtoId}`;

  const confirmar = promptCinza(
    `\n          Deseja realmente remover ${nomeProduto} do carrinho? (s/n): `,
  )
    .trim()
    .toLowerCase();

  if (confirmar !== "s") {
    logAmarelo("\n          Remoção cancelada.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  carrinho.splice(indice, 1);

  logVerde("\n          Produto removido do carrinho com sucesso!");
  promptCinza("\n          Pressione Enter para voltar ao menu...");
}

function alterarQuantidade(): void {
  logAzul("\n          === ALTERAR QUANTIDADE ===");

  if (carrinho.length === 0) {
    logAmarelo("\n          O carrinho está vazio.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const produtoId = Number(prompt("          Digite o ID do produto: "));

  if (!Number.isInteger(produtoId) || produtoId <= 0) {
    logVermelho("          Erro: informe um ID válido.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const item = carrinho.find((item) => item.produtoId === produtoId);

  if (!item) {
    logVermelho("          Erro: produto não encontrado no carrinho.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const produto = buscarProdutoPorId(produtoId);

  if (!produto) {
    logVermelho("          Erro: produto não encontrado no catálogo.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  logAzul(`\n          Produto: ${produto.nome}`);
  logAmarelo(`          Quantidade atual no carrinho: ${item.quantidade}`);
  logAmarelo(`          Estoque disponível total: ${produto.estoque}`);

  const quantidade = Number(prompt("\n          Digite a nova quantidade: "));

  if (!Number.isInteger(quantidade) || quantidade <= 0) {
    logVermelho(
      "          Erro: quantidade inválida (deve ser um inteiro maior que zero).",
    );
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  if (quantidade > produto.estoque) {
    logVermelho("          Erro: estoque insuficiente.");
    logAmarelo(`          Estoque disponível: ${produto.estoque}`);
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  item.quantidade = quantidade;

  logVerde("\n          Quantidade alterada com sucesso!");
  promptCinza("\n          Pressione Enter para voltar ao menu...");
}

function listarCarrinho(): ItemCarrinho[] {
  return carrinho;
}

function calcularSubtotal(produtoId: number): number {
  const item = carrinho.find((item) => item.produtoId === produtoId);

  if (!item) {
    return 0;
  }

  const produto = buscarProdutoPorId(produtoId);

  if (!produto) {
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
  const itens = listarCarrinho();

  if (itens.length === 0) {
    logAmarelo("\n          O carrinho está vazio.");
    promptCinza("\n          Pressione Enter para voltar ao menu...");
    return;
  }

  logVerde("\n          === ITENS DO CARRINHO ===");

  for (const item of itens) {
    const produto = buscarProdutoPorId(item.produtoId);

    if (!produto) {
      logVermelho(
        `\n          Erro: produto ID ${item.produtoId} não encontrado no catálogo.`,
      );
      continue;
    }

    const subtotal = produto.preco * item.quantidade;

    console.log("\n          ----------------------------------------");
    logVerde(`          Produto: ${produto.nome} (ID: ${produto.id})`);
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

  console.log("\n          ========================================");
  logAmarelo(
    `          TOTAL DA COMPRA: R$ ${total.toFixed(2).replace(".", ",")}`,
  );
  console.log("          ========================================");

  console.log("\n          1 - Finalizar pedido");
  logVermelho("          0 - Voltar");

  const opcao = promptVerde("\n          Escolha uma opção: ").trim();

  switch (opcao) {
    case "1": {
      const clienteId = Number(
        promptVerde("          Digite o ID do cliente: "),
      );
      if (!Number.isInteger(clienteId) || clienteId <= 0) {
        logVermelho("          Erro: informe um ID de cliente válido.");
        promptCinza("\n          Pressione Enter para voltar...");
        break;
      }

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
