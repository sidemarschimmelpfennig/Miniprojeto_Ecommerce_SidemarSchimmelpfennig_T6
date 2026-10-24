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
    criadoEm: new Date("2026-10-01T10:00:00"),
    atualizadoEm: null,
  },
  {
    id: 2,
    nome: "Mouse Gamer",
    categoria: "Periféricos",
    preco: 89.9,
    estoque: 15,
    criadoEm: new Date("2026-10-02T14:30:00"),
    atualizadoEm: null,
  },
  {
    id: 3,
    nome: "Monitor 24 polegadas",
    categoria: "Monitores",
    preco: 899.9,
    estoque: 5,
    criadoEm: new Date("2026-10-03T09:15:00"),
    atualizadoEm: null,
  },
  {
    id: 4,
    nome: "Headset Gamer",
    categoria: "Áudio",
    preco: 149.9,
    estoque: 8,
    criadoEm: new Date("2026-10-04T11:45:00"),
    atualizadoEm: null,
  },
  {
    id: 5,
    nome: "Webcam Full HD",
    categoria: "Acessórios",
    preco: 129.9,
    estoque: 12,
    criadoEm: new Date("2026-10-05T16:20:00"),
    atualizadoEm: null,
  },
];

function verProduto(id: number): Produto | string {
  const produto = produtos.find((produto) => produto.id === id);

  if (produto) {
    return produto;
  }

  console.log("\n=== ERRO ===");
  console.log("produto não encontrado.");
  console.log("1 - Tentar novamente");
  console.log("0 - Voltar ao menu anterior");

  const opcao = prompt("Escolha uma opção: ");

  switch (opcao) {
    case "1": {
      const id = prompt("Digite o id do produto: ");
      return verProduto(Number(id));
    }

    case "0":
      return "Operação cancelada";

    default:
      console.log("Opção inválida.");
      return "Operação cancelada";
  }
}

function listarProdutos(): void {
  console.log("\n=== LISTAGEM DE produtoS ===");

  if (produtos.length === 0) {
    console.log("Nenhum produto cadastrado.");
  } else {
    produtos.forEach((produto) => {
      console.log("--------------------");
      console.log(`ID: ${produto.id}`);
      console.log(`Nome: ${produto.nome}`);
      console.log(`Nome: ${produto.preco}`);
      console.log(`Nome: ${produto.categoria}`);
      console.log(`Nome: ${produto.estoque}`);
      console.log(`Valor Total em Estoque: ${produto.preco * produto.estoque}`);
    });
  }

  console.log("\n0 - Voltar");

  let opcao: string;

  do {
    opcao = prompt("Escolha uma opção: ");

    if (opcao !== "0") {
      console.log("Opção inválida. Digite 0 para voltar.");
    }
  } while (opcao !== "0");
}

function cadastrarProduto(): void {
  console.log("\n=== CADASTRAR PRODUTO ===");

  const nome = prompt("Digite o nome: ").trim();
  const preco = Number(prompt("Digite o preço: ").replace(",", "."));
  const estoque = Number(prompt("Digite o estoque: "));
  const categoria = prompt("Digite a categoria: ").trim();

  // Validar campos
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

  // Verificar se já existe um produto com o mesmo nome
  const produtoExiste = produtos.some(
    (produto) => produto.nome.trim().toLowerCase() === nome.toLowerCase(),
  );

  if (produtoExiste) {
    console.log("\nErro: já existe um produto com esse nome.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  // Criar produto
  const novoProduto: Produto = {
    id:
      produtos.length > 0
        ? Math.max(...produtos.map((produto) => produto.id)) + 1
        : 1,
    nome,
    categoria,
    preco,
    estoque,
    criadoEm: new Date(),
    atualizadoEm: null,
  };

  produtos.push(novoProduto);

  console.log("\nProduto cadastrado com sucesso!");
  console.log(`ID: ${novoProduto.id}`);
  console.log(`Nome: ${novoProduto.nome}`);
  console.log(`Categoria: ${novoProduto.categoria}`);
  console.log(`Preço: R$ ${novoProduto.preco.toFixed(2)}`);
  console.log(`Estoque: ${novoProduto.estoque}`);
  console.log(`Criado em: ${novoProduto.criadoEm}`);
  console.log(`Atualizado em: ${novoProduto.atualizadoEm}`);

  prompt("\nPressione Enter para voltar ao menu...");
}

export { verProduto, listarProdutos, cadastrarProduto };
