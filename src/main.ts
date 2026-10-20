import promptSync = require("prompt-sync");

import { cadastrarCliente, verClientes } from "./clientes";
import type { Cliente } from "./types";

const prompt = promptSync({ sigint: true });

const nomeInput: string = prompt("Digite o nome do cliente: ");
const idadeInput: number = Number(prompt("Digite a idade do cliente: "));
const email: string = prompt("Digite o email do cliente: ");

const novoCliente: Cliente = {
  id: Math.round(10),
  nome: nomeInput,
  idade: idadeInput,
  email: email,
  createdAt: new Date(),
};

cadastrarCliente(novoCliente);
console.log(verClientes());
