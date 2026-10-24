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

function cadastrarCliente(): void {
  logAzul("\n          === CADASTRAR CLIENTE ===");

  const id =
    clientes.length > 0
      ? Math.max(...clientes.map((cliente) => cliente.id)) + 1
      : 1;

  const nome = prompt("          Digite o nome: ").trim();
  const email = prompt("          Digite o e-mail: ").trim();

  if (!validarEmail(email)) {
    logVermelho("          Erro: informe um e-mail válido.");
    prompt("\n          Pressione Enter para voltar ao menu...");
    return;
  }

  if (!nome || !email) {
    logVermelho("\n     Erro: informe o nome e o e-mail.");
    prompt("\n          Pressione Enter para voltar ao menu...");
    return;
  }

  const emailExiste = clientes.some(
    (cliente) => cliente.email.toLowerCase() === email.toLowerCase(),
  );

  if (emailExiste) {
    logVermelho("\n     Erro: já existe um cliente com esse e-mail.");
    prompt("\n          Pressione Enter para voltar ao menu...");
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
  prompt("\n          Pressione Enter para voltar ao menu...");
}

function listarClientes(): Cliente[] {
  return clientes;
}

function listagemClientes(): void {
  const clients: Cliente[] = listarClientes();
  logAzul("\n           ===== Listar clientes =====");
  if (clients.length <= 0) {
    logAmarelo("           Nenhum pedido encontrado !");
  }
  clients.forEach((cliente) => {
    console.log("            ===================================");
    console.log(`            ID : ${cliente.id}`);
    console.log(`            Nome: ${cliente.nome}`);
    console.log(`            Email: ${cliente.email} `);
  });
  prompt("\n            Pressione Enter para voltar ao menu...");
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

  prompt("\n          Pressione Enter para voltar ao menu...");
}

export {
  cadastrarCliente,
  listarClientes,
  buscarClientePorId,
  listagemClientes,
};
