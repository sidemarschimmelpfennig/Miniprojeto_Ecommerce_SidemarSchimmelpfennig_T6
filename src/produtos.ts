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

export { verProduto };
