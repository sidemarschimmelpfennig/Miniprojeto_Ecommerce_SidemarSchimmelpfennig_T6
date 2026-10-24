import promptSync = require("prompt-sync");
import {
  cadastrarCliente,
  deletarCliente,
  editarCliente,
  listarClientes,
  verCliente,
} from "./clientes";
import { verProduto } from "./produtos";

const prompt = promptSync({ sigint: true });

function menuPrincipal(): void {
  let opcao: string;

  do {
    console.log("\n=== MENU PRINCIPAL ===");
    console.log("1 - Clientes");
    console.log("2 - Produtos");
    console.log("0 - Sair do sistema");

    opcao = prompt("Escolha uma opção: ").trim();

    switch (opcao) {
      case "1":
        menuClientes();
        break;
      case "2":
        menuProdutos();
        break;
      case "0": {
        const confirmar = prompt("\nDeseja realmente sair do sistema? (s/n): ")
          .trim()
          .toLowerCase();

        if (confirmar === "s") {
          console.log("\nSistema encerrado. Até logo!");
        } else {
          console.log("\nRetornando ao menu principal...");
          opcao = "";
        }

        break;
      }

      default:
        console.log("\nOpção inválida!");
        prompt("Pressione Enter para continuar...");
        break;
    }
  } while (opcao !== "0");
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
        editarCliente();
        break;

      case "5":
        deletarCliente();
        break;

      case "0":
        menuPrincipal();
        break;

      default:
        console.log("Opção inválida!");
    }
  } while (opcao !== "0");
}

function menuProdutos(): void {
  let opcao: string;

  do {
    console.log("\n=== Clientes ===");
    console.log("   1 - Cadastrar");
    console.log("   2 - Visualizar Cliente");
    console.log("   3 - Listar");
    console.log("   4 - Editar");
    console.log("   5 - Excluir");
    console.log("   0 - Voltar");

    opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        break;
      case "2": {
        const id = prompt("Digite o seu id: ");
        verProduto(Number(id));
        break;
      }
      case "3":
        break;
      case "4":
        break;

      case "5":
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
