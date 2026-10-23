import type { Cliente } from "./types";
import promptSync = require("prompt-sync");
const prompt = promptSync({ sigint: true });
import { tratarErro } from "./utils/tratarErro";

const clientes: Cliente[] = [
  {
    id: 1,
    nome: "João",
    idade: 30,
    email: "joao@email.com",
    createdAt: new Date("1995-12-17T03:24:00"),
  },
];

function verCliente(email: string): Cliente | string {
  const cliente = clientes.find((cliente) => cliente.email === email);

  if (cliente) {
    return cliente;
  }

  console.log("\n=== ERRO ===");
  console.log("Cliente não encontrado.");
  console.log("1 - Tentar novamente");
  console.log("0 - Voltar ao menu anterior");

  const opcao = prompt("Escolha uma opção: ");

  switch (opcao) {
    case "1": {
      const novoEmail = prompt("Digite o e-mail novamente: ");
      return verCliente(novoEmail);
    }

    case "0":
      return "Operação cancelada";

    default:
      console.log("Opção inválida.");
      return "Operação cancelada";
  }
}

function listarClientes(): void {
  console.log("\n=== LISTAGEM DE CLIENTES ===");

  if (clientes.length === 0) {
    console.log("Nenhum cliente cadastrado.");
  } else {
    clientes.forEach((cliente) => {
      console.log("--------------------");
      console.log(`ID: ${cliente.id}`);
      console.log(`Nome: ${cliente.nome}`);
      console.log(`Idade: ${cliente.idade}`);
      console.log(`E-mail: ${cliente.email}`);
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

function cadastrarCliente(): void {
  console.log("\n=== CADASTRAR CLIENTE ===");

  const nome = prompt("Digite o nome: ").trim();
  const idade = Number(prompt("Digite a idade: "));
  const email = prompt("Digite o e-mail: ").trim();

  // Validar campos
  if (!nome || !email || !Number.isInteger(idade) || idade <= 0) {
    console.log("\nErro: informe nome, e-mail e idade válida.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  // Verificar e-mail duplicado
  const existe = clientes.some(
    (cliente) => cliente.email.toLowerCase() === email.toLowerCase(),
  );

  if (existe) {
    console.log("\nErro: já existe um cliente com esse e-mail.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  // Criar cliente
  const novoCliente: Cliente = {
    id:
      clientes.length > 0
        ? Math.max(...clientes.map((cliente) => cliente.id)) + 1
        : 1,
    nome,
    idade,
    email,
    createdAt: new Date(),
  };

  clientes.push(novoCliente);

  console.log("\nCliente cadastrado com sucesso!");
  console.log(`ID: ${novoCliente.id}`);
  console.log(`Nome: ${novoCliente.nome}`);
  console.log(`E-mail: ${novoCliente.email}`);

  prompt("\nPressione Enter para voltar ao menu...");
}

function atualizarCliente(): void {}

function deletarCliente(): void {}

export { verCliente, listarClientes, cadastrarCliente };
