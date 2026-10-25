import type { Cliente } from "./types";
import {
  logAmarelo,
  logAzul,
  logCinza,
  logVerde,
  logVermelho,
} from "./utils/console";
import { prompt } from "./utils/prompt";

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

function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarNome(nome: string): boolean {
  if (!nome || typeof nome !== "string") return false;
  const regexNome = /^[\p{L}\p{M}'-]{2,}(?:\s+[\p{L}\p{M}'-]{2,})+$/u;
  return regexNome.test(nome.trim());
}

function cadastrarCliente(): void {
  logAzul("\n          === CADASTRAR CLIENTE ===");

  const id =
    clientes.length > 0
      ? Math.max(...clientes.map((cliente) => cliente.id)) + 1
      : 1;

  const nome = prompt("          Digite o nome completo: ").trim();
  const email = prompt("          Digite o e-mail: ").trim();

  if (!nome || !email) {
    logVermelho("          Erro: informe o nome e o e-mail.");
    prompt("\n          Pressione Enter para voltar ao menu...");
    return;
  }

  if (!validarNome(nome)) {
    logVermelho(
      "          Erro: informe o nome completo válido (ao menos nome e sobrenome).",
    );
    prompt("\n          Pressione Enter para voltar ao menu...");
    return;
  }

  if (!validarEmail(email)) {
    logVermelho("          Erro: informe um e-mail válido.");
    prompt("\n          Pressione Enter para voltar ao menu...");
    return;
  }

  const emailExiste = clientes.some(
    (cliente) => cliente.email.toLowerCase() === email.toLowerCase(),
  );

  if (emailExiste) {
    logVermelho("          Erro: já existe um cliente com esse e-mail.");
    prompt("\n          Pressione Enter para voltar ao menu...");
    return;
  }

  const novoCliente: Cliente = {
    id,
    nome,
    email,
  };

  clientes.push(novoCliente);

  logVerde("\n          Cliente cadastrado com sucesso!");
  exibirDetalhesCliente(novoCliente);
  prompt("\n          Pressione Enter para voltar ao menu...");
}

function listarClientes(): Cliente[] {
  return clientes;
}

function buscarClientePorId(id: number): Cliente | undefined {
  return clientes.find((cliente) => cliente.id === id);
}

function exibirDetalhesCliente(cliente: Cliente): void {
  console.log("\n          ----------------------------------------");
  logVerde(`          Cliente ID: ${cliente.id}`);
  console.log(`          Nome: ${cliente.nome}`);
  console.log(`          E-mail: ${cliente.email}`);
  console.log("          ----------------------------------------");
}

export {
  cadastrarCliente,
  listarClientes,
  buscarClientePorId,
  exibirDetalhesCliente,
  validarNome,
  validarEmail,
};
