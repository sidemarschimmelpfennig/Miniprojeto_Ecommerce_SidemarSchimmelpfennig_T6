import type { Cliente } from "./types";
import promptSync = require("prompt-sync");
import { logAzul, logCinza, logVerde, logVermelho } from "./utils/console";

const prompt = promptSync({ sigint: true });

const clientes: Cliente[] = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao.silva@email.com",
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    email: "maria.oliveira@email.com",
  },
  {
    id: 3,
    nome: "Pedro Santos",
    email: "pedro.santos@email.com",
  },
];

function cadastrarCliente(): void {
  console.log("\n          === CADASTRAR CLIENTE ===");

  const id = Number(prompt("          Digite o ID: "));
  const nome = prompt("          Digite o nome: ").trim();
  const email = prompt("          Digite o e-mail: ").trim();

  if (!Number.isInteger(id) || id <= 0 || !nome || !email) {
    logVermelho("\n     Erro: informe um ID válido, nome e e-mail.");
    return;
  }

  const idExiste = clientes.some((cliente) => cliente.id === id);

  if (idExiste) {
    logVermelho("\n     Erro: já existe um cliente com esse ID.");
    return;
  }

  const emailExiste = clientes.some(
    (cliente) => cliente.email.toLowerCase() === email.toLowerCase(),
  );

  if (emailExiste) {
    logVermelho("\n     Erro: já existe um cliente com esse e-mail.");
    return;
  }

  const novoCliente: Cliente = {
    id,
    nome,
    email,
  };

  clientes.push(novoCliente);

  logVerde("\n         Cliente cadastrado com sucesso!");
  logCinza(`         ID: ${novoCliente.id}`);
  logCinza(`         Nome: ${novoCliente.nome}`);
  logCinza(`         E-mail: ${novoCliente.email}`);
}

function listarClientes(): void {
  logAzul("\n     === LISTAGEM DE CLIENTES ===");

  if (clientes.length === 0) {
    logVerde("     Nenhum cliente cadastrado.");
    return;
  }

  clientes.forEach((cliente) => {
    logCinza("     --------------------");
    console.log(`    ID: ${cliente.id}`);
    console.log(`    Nome: ${cliente.nome}`);
    console.log(`    E-mail: ${cliente.email}`);
  });
}

function buscarClientePorId(id: number): Cliente | undefined {
  const cliente = clientes.find((cliente) => cliente.id === id);

  if (!cliente) {
    console.log("\nCliente não encontrado.");
    return undefined;
  }

  logAzul("\n     === CLIENTE ENCONTRADO ===");
  console.log(`     ID: ${cliente.id}`);
  console.log(`     Nome: ${cliente.nome}`);
  console.log(`     E-mail: ${cliente.email}`);

  return cliente;
}

export { cadastrarCliente, listarClientes, buscarClientePorId };
