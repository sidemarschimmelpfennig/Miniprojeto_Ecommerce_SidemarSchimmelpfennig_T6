import promptSync = require("prompt-sync");

import { cadastrarCliente, verClientes } from "./clientes";
// import type { Cliente } from "./types";

const prompt = promptSync({ sigint: true });

// const nomeInput: string = prompt("Digite o nome do cliente: ");
// const idadeInput: number = Number(prompt("Digite a idade do cliente: "));
// const email: string = prompt("Digite o email do cliente: ");

// const novoCliente: Cliente = {
//   id: Math.round(10),
//   nome: nomeInput,
//   idade: idadeInput,
//   email: email,
//   createdAt: new Date(),
// };

function menuPrincipal(): void {
  let opcao;
  console.log("\n=== MENU ===");
  console.log("1 - Produtos");
  opcao = prompt("Escolha uma opção: ");
  switch (opcao) {
    case "1":
      menuClientes();
      break;
    case "0":
      console.log("Voltando ao menu principal...");
      break;
  }
}

function menuClientes(): void {
  let opcao: string;

  do {
    console.log("\n=== Clientes ===");
    console.log("1 - Cadastrar");
    console.log("2 - Listar");
    console.log("3 - Editar");
    console.log("4 - Excluir");
    console.log("0 - Voltar");

    opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        console.log("Cadastrando cliente...");
        break;

      case "2":
        console.log("Listando cliente...");
        break;

      case "3":
        console.log("Editando cliente...");
        break;

      case "4":
        console.log("Excluindo cliente...");
        break;

      case "0":
        menuPrincipal();
        break;

      default:
        console.log("Opção inválida!");
    }
  } while (opcao !== "0");
}
menuPrincipal();
