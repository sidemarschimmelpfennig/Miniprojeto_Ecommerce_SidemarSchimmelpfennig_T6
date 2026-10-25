import type { Produto } from "./types";
import {
  logAmarelo,
  logAzul,
  logCinza,
  logVerde,
  logVermelho,
} from "./utils/console";
import { prompt, promptCinza } from "./utils/prompt";

const produtos: Produto[] = [
  {
    id: 1,
    nome: "Teclado Mecânico",
    categoria: "Periféricos",
    preco: 199.9,
    estoque: 10,
  },
  {
    id: 2,
    nome: "Mouse Gamer",
    categoria: "Periféricos",
    preco: 89.9,
    estoque: 15,
  },
  {
    id: 3,
    nome: "Monitor 24 polegadas",
    categoria: "Monitores",
    preco: 899.9,
    estoque: 5,
  },
  {
    id: 4,
    nome: "Headset Gamer",
    categoria: "Áudio",
    preco: 149.9,
    estoque: 8,
  },
  {
    id: 5,
    nome: "Webcam Full HD",
    categoria: "Acessórios",
    preco: 129.9,
    estoque: 12,
  },
];

function listarProdutos(): Produto[] {
  return produtos;
}

function buscarProdutoPorId(id: number): Produto | undefined {
  return produtos.find((produto) => produto.id === id);
}

function buscarProdutosPorNome(termo: string): Produto[] {
  const busca = termo.trim().toLowerCase();
  return produtos.filter((produto) => produto.nome.toLowerCase().includes(busca));
}

function filtrarProdutosPorCategoria(categoria: string): Produto[] {
  const busca = categoria.trim().toLowerCase();
  return produtos.filter(
    (produto) => produto.categoria.toLowerCase() === busca,
  );
}

function verProduto(id: number): Produto | string {
  const produto = buscarProdutoPorId(id);
  if (!produto) {
    return "Produto não encontrado.";
  }
  return produto;
}

function exibirDetalhesProduto(produto: Produto): void {
  console.log("\n          ----------------------------------------");
  logVerde(`          Produto ID: ${produto.id}`);
  console.log(`          Nome: ${produto.nome}`);
  console.log(`          Categoria: ${produto.categoria}`);
  console.log(`          Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")}`);
  console.log(`          Estoque: ${produto.estoque} unidade(s)`);
  console.log("          ----------------------------------------");
}

function cadastrarProduto(): void {
  logAzul("\n          === CADASTRAR PRODUTO ===");

  const nome = prompt("          Digite o nome: ").trim();
  const categoria = prompt("          Digite a categoria: ").trim();
  const preco = Number(
    prompt("          Digite o preço: ").replace(",", "."),
  );
  const estoque = Number(prompt("          Digite o estoque: "));

  if (
    !nome ||
    !categoria ||
    !Number.isFinite(preco) ||
    preco <= 0 ||
    !Number.isInteger(estoque) ||
    estoque < 0
  ) {
    logVermelho(
      "          Erro: informe nome e categoria, preço maior que zero e estoque inteiro não negativo.",
    );
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const produtoExiste = produtos.some(
    (produto) => produto.nome.toLowerCase() === nome.toLowerCase(),
  );

  if (produtoExiste) {
    logVermelho("          Erro: já existe um produto com esse nome.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const novoProduto: Produto = {
    id:
      produtos.length > 0
        ? Math.max(...produtos.map((produto) => produto.id)) + 1
        : 1,
    nome,
    categoria,
    preco,
    estoque,
  };

  produtos.push(novoProduto);

  logVerde("\n          Produto cadastrado com sucesso!");
  exibirDetalhesProduto(novoProduto);
  promptCinza("\n          Pressione Enter para voltar ao menu...");
}

function editarProduto(): void {
  logAzul("\n          === EDITAR PRODUTO ===");

  const id = Number(prompt("          Digite o ID do produto: "));

  if (!Number.isInteger(id) || id <= 0) {
    logVermelho("          Erro: informe um ID válido.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const produto = produtos.find((item) => item.id === id);

  if (!produto) {
    logVermelho("          Erro: produto não encontrado.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  logAzul("\n          === DADOS ATUAIS DO PRODUTO ===");
  exibirDetalhesProduto(produto);

  logCinza("          Pressione Enter para manter o valor atual.");

  const nome = prompt("          Novo nome: ").trim();
  const categoria = prompt("          Nova categoria: ").trim();
  const precoInput = prompt("          Novo preço: ").trim();
  const estoqueInput = prompt("          Novo estoque: ").trim();

  const novoNome = nome || produto.nome;
  const novaCategoria = categoria || produto.categoria;
  const novoPreco =
    precoInput === "" ? produto.preco : Number(precoInput.replace(",", "."));
  const novoEstoque =
    estoqueInput === "" ? produto.estoque : Number(estoqueInput);

  if (
    !novoNome ||
    !novaCategoria ||
    !Number.isFinite(novoPreco) ||
    novoPreco <= 0 ||
    !Number.isInteger(novoEstoque) ||
    novoEstoque < 0
  ) {
    logVermelho(
      "          Erro: nome e categoria são obrigatórios, preço deve ser maior que zero e estoque inteiro não negativo.",
    );
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const nomeExiste = produtos.some(
    (item) =>
      item.id !== produto.id &&
      item.nome.toLowerCase() === novoNome.toLowerCase(),
  );

  if (nomeExiste) {
    logVermelho("          Erro: já existe outro produto com esse nome.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  produto.nome = novoNome;
  produto.categoria = novaCategoria;
  produto.preco = novoPreco;
  produto.estoque = novoEstoque;

  logVerde("\n          Produto atualizado com sucesso!");
  exibirDetalhesProduto(produto);
  promptCinza("\n          Pressione Enter para voltar ao menu...");
}

function deletarProduto(): void {
  logAzul("\n          === EXCLUIR PRODUTO ===");

  const id = Number(prompt("          Digite o ID do produto: "));

  if (!Number.isInteger(id) || id <= 0) {
    logVermelho("          Erro: informe um ID válido.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const indice = produtos.findIndex((produto) => produto.id === id);

  if (indice === -1) {
    logVermelho("          Erro: produto não encontrado.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  const produto = produtos[indice];

  if (!produto) {
    logVermelho("          Erro: produto não encontrado.");
    promptCinza("\n          Pressione Enter para voltar...");
    return;
  }

  logAzul("\n          === DADOS DO PRODUTO ===");
  exibirDetalhesProduto(produto);

  const confirmar = promptCinza(
    "\n          Deseja realmente excluir este produto? (s/n): ",
  )
    .trim()
    .toLowerCase();

  if (confirmar !== "s") {
    logAmarelo("\n          Exclusão cancelada.");
    promptCinza("\n          Pressione Enter para voltar ao menu...");
    return;
  }

  produtos.splice(indice, 1);

  logVerde("\n          Produto excluído com sucesso!");
  promptCinza("\n          Pressione Enter para voltar ao menu...");
}

export {
  listarProdutos,
  buscarProdutoPorId,
  buscarProdutosPorNome,
  filtrarProdutosPorCategoria,
  verProduto,
  exibirDetalhesProduto,
  cadastrarProduto,
  editarProduto,
  deletarProduto,
};
