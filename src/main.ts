import promptSync = require("prompt-sync");
import { listarClientes, verCliente } from "./clientes";

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
  console.log("1 - Clientes");
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
    console.log("2 - Visualizar Cliente");
    console.log("3 - Listar");
    console.log("4 - Editar");
    console.log("5 - Excluir");
    console.log("0 - Voltar");

    opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        console.log("Cadastrando cliente...");
        break;
      case "2": {
        const email = prompt("Digite o e-mail: ");
        const resultado = verCliente(email);

        console.log(resultado);
        break;
      }
      case "3":
        listarClientes();
        break;
      case "4":
        console.log("Editando cliente...");
        break;

      case "5":
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
