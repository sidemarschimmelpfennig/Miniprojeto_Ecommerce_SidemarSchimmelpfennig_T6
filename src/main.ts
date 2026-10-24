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

import {
  adicionarAoCarrinho,
  alterarQuantidade,
  calcularTotalCarrinho,
  listarCarrinho,
  removerDoCarrinho,
} from "./carrinho";
import { logAzul, logCinza, logVerde, logVermelho } from "./utils/console";
import { promptCinza, promptVerde } from "./utils/prompt";

const prompt = promptSync({ sigint: true });

function menuPrincipal(): void {
  let opcao: string;

  do {
    logAzul("\n=== MENU PRINCIPAL ===");
    logCinza("1 - Clientes");
    logCinza("2 - Produtos");
    logCinza("3 - Pedidos");
    logCinza("4 - Relatórios");
    logCinza("5 - Carrinho");
    logVermelho("0 - Sair do sistema");

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
        logAzul("\n=== RELATÓRIOS ===");
        console.log("Módulo de relatórios ainda não conectado.");
        promptVerde("Pressione Enter para continuar...");
        break;
      case "5":
        menuCarrinho();
        break;
      case "0": {
        const confirmar = promptCinza(
          "\nDeseja realmente sair do sistema? (s/n): ",
        )
          .trim()
          .toLowerCase();

        if (confirmar === "s") {
          logVerde("\nSistema encerrado. Até logo!");
        } else {
          opcao = "";
        }

        break;
      }

      default:
        logVermelho("\nOpção inválida!");
        prompt("Pressione Enter para continuar...");
    }
  } while (opcao !== "0");
}

function menuClientes(): void {
  let opcao: string;

  do {
    logAzul("\n     === CLIENTES ===");
    console.log("     1 - Cadastrar cliente");
    console.log("     2 - Buscar cliente por ID");
    console.log("     3 - Listar clientes");
    logVermelho("     0 - Voltar");

    opcao = promptVerde("     Escolha uma opção: ").trim();

    switch (opcao) {
      case "1":
        cadastrarCliente();
        break;

      case "2": {
        const id = Number(promptVerde("Digite o ID do cliente: "));
        buscarClientePorId(id);
        promptCinza("Pressione Enter para continuar...");
        break;
      }

      case "3":
        listarClientes();
        break;

      case "0":
        break;

      default:
        logVermelho("Opção inválida!");
        promptCinza("Pressione Enter para continuar...");
    }
  } while (opcao !== "0");
}

function menuProdutos(): void {
  let opcao: string;

  do {
    logAzul("\n     === PRODUTOS ===");
    logCinza("     1 - Cadastrar produto");
    logCinza("     2 - Buscar produto por ID");
    logCinza("     3 - Listar produtos");
    logCinza("     4 - Editar produto");
    logCinza("     5 - Excluir produto");
    logVermelho("     0 - Voltar");

    opcao = promptVerde("     Escolha uma opção: ").trim();

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
    console.log("    1 - Listar todos os pedidos");
    console.log("    2 - Buscar pedido por ID");
    console.log("    3 - Listar pedidos por cliente");
    console.log("    0 - Voltar");

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

function menuCarrinho(): void {
  let opcao: string;

  do {
    logAzul("\n     === CARRINHO ===");
    logCinza("    1 - Adicionar produto");
    logCinza("    2 - Remover produto");
    logCinza("    3 - Alterar quantidade");
    logCinza("    4 - Listar carrinho");
    logCinza("    5 - Calcular total");
    logVermelho("    0 - Voltar");

    opcao = promptVerde("    Escolha uma opção: ").trim();

    switch (opcao) {
      case "1":
        adicionarAoCarrinho();
        promptCinza("          Pressione Enter para continuar...");
        break;

      case "2":
        removerDoCarrinho();
        promptCinza("           Pressione Enter para continuar...");
        break;

      case "3":
        alterarQuantidade();
        promptCinza("           Pressione Enter para continuar...");
        break;

      case "4":
        listarCarrinho();
        break;

      case "5":
        console.log(
          `Total do carrinho: R$ ${calcularTotalCarrinho()
            .toFixed(2)
            .replace(".", ",")}`,
        );
        prompt("          Pressione Enter para continuar...");
        break;

      case "0":
        break;

      default:
        console.log("Opção inválida!");
        prompt("     Pressione Enter para continuar...");
    }
  } while (opcao !== "0");
}

menuPrincipal();
