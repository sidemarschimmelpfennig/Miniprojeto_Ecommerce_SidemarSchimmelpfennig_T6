import promptSync = require("prompt-sync");

import {
  cadastrarCliente,
  listarClientes,
  buscarClientePorId,
} from "./clientes";

import {
  cadastrarProduto,
  deletarProduto,
  editarProduto,
  listarProdutos,
  verProduto,
} from "./produtos";

import {
  listarPedidos,
  listarPedidosPorCliente,
  buscarPedidoPorId,
} from "./pedidos";

const prompt = promptSync({ sigint: true });

function menuPrincipal(): void {
  let opcao: string;

  do {
    console.log("\n=== MENU PRINCIPAL ===");
    console.log("1 - Clientes");
    console.log("2 - Produtos");
    console.log("3 - Pedidos");
    console.log("4 - Relatórios");
    console.log("0 - Sair do sistema");

    opcao = prompt("Escolha uma opção: ").trim();

    switch (opcao) {
      case "1":
        menuClientes();
        break;

      case "2":
        menuProdutos();
        break;

      case "3":
        menuPedidos();
        break;

      case "4":
        console.log("\n=== RELATÓRIOS ===");
        console.log("Módulo de relatórios ainda não conectado.");
        prompt("Pressione Enter para continuar...");
        break;

      case "0": {
        const confirmar = prompt("\nDeseja realmente sair do sistema? (s/n): ")
          .trim()
          .toLowerCase();

        if (confirmar === "s") {
          console.log("\nSistema encerrado. Até logo!");
        } else {
          opcao = "";
        }

        break;
      }

      default:
        console.log("\nOpção inválida!");
        prompt("Pressione Enter para continuar...");
    }
  } while (opcao !== "0");
}

function menuClientes(): void {
  let opcao: string;

  do {
    console.log("\n=== CLIENTES ===");
    console.log("1 - Cadastrar cliente");
    console.log("2 - Buscar cliente por ID");
    console.log("3 - Listar clientes");
    console.log("0 - Voltar");

    opcao = prompt("Escolha uma opção: ").trim();

    switch (opcao) {
      case "1":
        cadastrarCliente();
        break;

      case "2": {
        const id = Number(prompt("Digite o ID do cliente: "));
        buscarClientePorId(id);
        prompt("Pressione Enter para continuar...");
        break;
      }

      case "3":
        listarClientes();
        break;

      case "0":
        break;

      default:
        console.log("Opção inválida!");
        prompt("Pressione Enter para continuar...");
    }
  } while (opcao !== "0");
}

function menuProdutos(): void {
  let opcao: string;

  do {
    console.log("\n=== PRODUTOS ===");
    console.log("1 - Cadastrar produto");
    console.log("2 - Buscar produto por ID");
    console.log("3 - Listar produtos");
    console.log("4 - Editar produto");
    console.log("5 - Excluir produto");
    console.log("0 - Voltar");

    opcao = prompt("Escolha uma opção: ").trim();

    switch (opcao) {
      case "1":
        cadastrarProduto();
        break;

      case "2": {
        const id = Number(prompt("Digite o ID do produto: "));
        console.log(verProduto(id));
        prompt("Pressione Enter para continuar...");
        break;
      }

      case "3":
        listarProdutos();
        break;

      case "4":
        editarProduto();
        break;

      case "5":
        deletarProduto();
        break;

      case "0":
        break;

      default:
        console.log("Opção inválida!");
        prompt("Pressione Enter para continuar...");
    }
  } while (opcao !== "0");
}

function menuPedidos(): void {
  let opcao: string;

  do {
    console.log("\n=== PEDIDOS ===");
    console.log("1 - Listar todos os pedidos");
    console.log("2 - Buscar pedido por ID");
    console.log("3 - Listar pedidos por cliente");
    console.log("0 - Voltar");

    opcao = prompt("Escolha uma opção: ").trim();

    switch (opcao) {
      case "1":
        console.log(listarPedidos());
        prompt("Pressione Enter para continuar...");
        break;

      case "2": {
        const id = Number(prompt("Digite o ID do pedido: "));
        console.log(buscarPedidoPorId(id));
        prompt("Pressione Enter para continuar...");
        break;
      }

      case "3": {
        const clienteId = Number(prompt("Digite o ID do cliente: "));
        console.log(listarPedidosPorCliente(clienteId));
        prompt("Pressione Enter para continuar...");
        break;
      }

      case "0":
        break;

      default:
        console.log("Opção inválida!");
        prompt("Pressione Enter para continuar...");
    }
  } while (opcao !== "0");
}

menuPrincipal();
