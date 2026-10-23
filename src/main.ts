import promptSync = require("prompt-sync");
import { cadastrarCliente, listarClientes, verCliente } from "./clientes";

const prompt = promptSync({ sigint: true });

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
        cadastrarCliente();
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
