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

export { verCliente };
