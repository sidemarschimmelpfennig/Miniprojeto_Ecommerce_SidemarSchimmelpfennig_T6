import type { Produto } from "./types";
import promptSync = require("prompt-sync");

const prompt = promptSync({ sigint: true });

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

function verProduto(id: number): Produto | string {
  const produto = produtos.find((produto) => produto.id === id);

  if (produto) {
    return produto;
  }

  console.log("\n=== ERRO ===");
  console.log("Produto não encontrado.");
  console.log("1 - Tentar novamente");
  console.log("0 - Voltar ao menu anterior");

  const opcao = prompt("Escolha uma opção: ");

  switch (opcao) {
    case "1": {
      const novoId = Number(prompt("Digite o ID do produto: "));

      if (!Number.isInteger(novoId) || novoId <= 0) {
        console.log("\nErro: informe um ID válido.");
        return "Operação cancelada";
      }

      return verProduto(novoId);
    }

    case "0":
      return "Operação cancelada";

    default:
      console.log("Opção inválida.");
      return "Operação cancelada";
  }
}

function listarProdutos(): Produto[] {
  return produtos;
}

function cadastrarProduto(): void {
  console.log("\n=== CADASTRAR PRODUTO ===");

  const nome = prompt("Digite o nome: ").trim();
  const preco = Number(prompt("Digite o preço: ").replace(",", "."));
  const estoque = Number(prompt("Digite o estoque: "));
  const categoria = prompt("Digite a categoria: ").trim();

  if (
    !nome ||
    !categoria ||
    !Number.isFinite(preco) ||
    preco <= 0 ||
    !Number.isInteger(estoque) ||
    estoque < 0
  ) {
    console.log(
      "\nErro: informe nome e categoria, preço maior que zero e estoque inteiro não negativo.",
    );
    prompt("Pressione Enter para voltar...");
    return;
  }

  const produtoExiste = produtos.some(
    (produto) => produto.nome.toLowerCase() === nome.toLowerCase(),
  );

  if (produtoExiste) {
    console.log("\nErro: já existe um produto com esse nome.");
    prompt("Pressione Enter para voltar...");
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

  console.log("\nProduto cadastrado com sucesso!");
  console.log(`ID: ${novoProduto.id}`);
  console.log(`Nome: ${novoProduto.nome}`);
  console.log(`Categoria: ${novoProduto.categoria}`);
  console.log(`Preço: R$ ${novoProduto.preco.toFixed(2).replace(".", ",")}`);
  console.log(`Estoque: ${novoProduto.estoque}`);

  prompt("\nPressione Enter para voltar ao menu...");
}

function editarProduto(): void {
  console.log("\n=== EDITAR PRODUTO ===");

  const id = Number(prompt("Digite o ID do produto: "));

  if (!Number.isInteger(id) || id <= 0) {
    console.log("\nErro: informe um ID válido.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  const produto = produtos.find((item) => item.id === id);

  if (!produto) {
    console.log("\nErro: produto não encontrado.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  console.log("\n=== DADOS ATUAIS DO PRODUTO ===");
  console.log(`ID: ${produto.id}`);
  console.log(`Nome: ${produto.nome}`);
  console.log(`Categoria: ${produto.categoria}`);
  console.log(`Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")}`);
  console.log(`Estoque: ${produto.estoque}`);

  console.log("\nPressione Enter para manter o valor atual.");

  const nome = prompt("Novo nome: ").trim();
  const categoria = prompt("Nova categoria: ").trim();
  const precoInput = prompt("Novo preço: ").trim();
  const estoqueInput = prompt("Novo estoque: ").trim();

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
    console.log(
      "\nErro: nome e categoria são obrigatórios, preço deve ser maior que zero e estoque deve ser um inteiro não negativo.",
    );
    prompt("Pressione Enter para voltar...");
    return;
  }

  const nomeExiste = produtos.some(
    (item) =>
      item.id !== produto.id &&
      item.nome.toLowerCase() === novoNome.toLowerCase(),
  );

  if (nomeExiste) {
    console.log("\nErro: já existe outro produto com esse nome.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  produto.nome = novoNome;
  produto.categoria = novaCategoria;
  produto.preco = novoPreco;
  produto.estoque = novoEstoque;

  console.log("\nProduto atualizado com sucesso!");
  console.log(`ID: ${produto.id}`);
  console.log(`Nome: ${produto.nome}`);
  console.log(`Categoria: ${produto.categoria}`);
  console.log(`Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")}`);
  console.log(`Estoque: ${produto.estoque}`);

  prompt("\nPressione Enter para voltar ao menu...");
}

function deletarProduto(): void {
  console.log("\n=== EXCLUIR PRODUTO ===");

  const id = Number(prompt("Digite o ID do produto: "));

  if (!Number.isInteger(id) || id <= 0) {
    console.log("\nErro: informe um ID válido.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  const indice = produtos.findIndex((produto) => produto.id === id);

  if (indice === -1) {
    console.log("\nErro: produto não encontrado.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  const produto = produtos[indice];

  if (!produto) {
    console.log("\nErro: produto não encontrado.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  console.log("\n=== DADOS DO PRODUTO ===");
  console.log(`ID: ${produto.id}`);
  console.log(`Nome: ${produto.nome}`);
  console.log(`Categoria: ${produto.categoria}`);
  console.log(`Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")}`);
  console.log(`Estoque: ${produto.estoque}`);

  const confirmar = prompt("\nDeseja realmente excluir este produto? (s/n): ")
    .trim()
    .toLowerCase();

  if (confirmar !== "s") {
    console.log("\nExclusão cancelada.");
    prompt("Pressione Enter para voltar ao menu...");
    return;
  }

  produtos.splice(indice, 1);

  console.log("\nProduto excluído com sucesso!");
  prompt("Pressione Enter para voltar ao menu...");
}

export {
  verProduto,
  listarProdutos,
  cadastrarProduto,
  editarProduto,
  deletarProduto,
};
