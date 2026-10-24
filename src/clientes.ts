import type { Cliente } from "./types";
import promptSync = require("prompt-sync");
const prompt = promptSync({ sigint: true });

const clientes: Cliente[] = [
  {
    id: 1,
    nome: "João Silva",
    idade: 30,
    email: "joao.silva@email.com",
    createdAt: new Date("2025-01-15T10:30:00"),
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    idade: 25,
    email: "maria.oliveira@email.com",
    createdAt: new Date("2025-02-20T14:15:00"),
  },
  {
    id: 3,
    nome: "Pedro Santos",
    idade: 42,
    email: "pedro.santos@email.com",
    createdAt: new Date("2025-03-10T09:45:00"),
  },
  {
    id: 4,
    nome: "Ana Costa",
    idade: 35,
    email: "ana.costa@email.com",
    createdAt: new Date("2025-04-05T16:20:00"),
  },
  {
    id: 5,
    nome: "Lucas Ferreira",
    idade: 28,
    email: "lucas.ferreira@email.com",
    createdAt: new Date("2025-05-12T11:00:00"),
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

function editarCliente(): void {
  console.log("\n=== EDITAR CLIENTE ===");

  const emailBusca = prompt("Digite o e-mail do cliente: ")
    .trim()
    .toLowerCase();

  const cliente = clientes.find(
    (item) => item.email.trim().toLowerCase() === emailBusca,
  );

  if (!cliente) {
    console.log("\nErro: cliente não encontrado.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  console.log("\n=== DADOS ATUAIS ===");
  console.log(`Nome: ${cliente.nome}`);
  console.log(`Idade: ${cliente.idade}`);
  console.log(`E-mail: ${cliente.email}`);

  console.log("\nDigite os novos dados.");
  console.log("Pressione Enter para manter o valor atual.");

  const nomeInput = prompt(`Nome (${cliente.nome}): `).trim();
  const idadeInput = prompt(`Idade (${cliente.idade}): `).trim();
  const emailInput = prompt(`E-mail (${cliente.email}): `).trim();

  const nome = nomeInput || cliente.nome;
  const idade = idadeInput === "" ? cliente.idade : Number(idadeInput);
  const email = (emailInput || cliente.email).trim().toLowerCase();

  if (!nome || !Number.isInteger(idade) || idade <= 0 || !email) {
    console.log("\nErro: dados inválidos.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  // Verifica se o e-mail pertence a outro cliente
  const emailExiste = clientes.some(
    (item) =>
      item.id !== cliente.id && item.email.trim().toLowerCase() === email,
  );

  if (emailExiste) {
    console.log("\nErro: esse e-mail já pertence a outro cliente.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  // Atualiza os dados do cliente
  cliente.nome = nome;
  cliente.idade = idade;
  cliente.email = email;

  console.log("\nCliente atualizado com sucesso!");
  console.log(`Nome: ${cliente.nome}`);
  console.log(`Idade: ${cliente.idade}`);
  console.log(`E-mail: ${cliente.email}`);

  prompt("\nPressione Enter para voltar ao menu...");
}

function deletarCliente(): void {
  console.log("\n=== EXCLUIR CLIENTE ===");

  const email = prompt("Digite o e-mail do cliente: ").trim().toLowerCase();

  const indice = clientes.findIndex(
    (cliente) => cliente.email.trim().toLowerCase() === email,
  );

  if (indice === -1) {
    console.log("\nErro: cliente não encontrado.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  const cliente = clientes[indice];

  if (!cliente) {
    console.log("\nErro: cliente não encontrado.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  console.log("\n=== DADOS DO CLIENTE ===");
  console.log(`ID: ${cliente.id}`);
  console.log(`Nome: ${cliente.nome}`);
  console.log(`Idade: ${cliente.idade}`);
  console.log(`E-mail: ${cliente.email}`);

  const confirmar = prompt(
    "\nTem certeza que deseja excluir este cliente? (s/n): ",
  )
    .trim()
    .toLowerCase();

  if (confirmar !== "s") {
    console.log("\nExclusão cancelada.");
    prompt("Pressione Enter para voltar...");
    return;
  }

  clientes.splice(indice, 1);

  console.log("\nCliente excluído com sucesso!");
  prompt("Pressione Enter para voltar ao menu...");
}

export {
  verCliente,
  listarClientes,
  cadastrarCliente,
  editarCliente,
  deletarCliente,
};
