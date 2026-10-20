import type { Cliente } from "./types";

const clientes: Cliente[] = [
  {
    id: 1,
    nome: "João",
    idade: 30,
    email: "joao@email.com",
    createdAt: new Date("1995-12-17T03:24:00"),
  },
];

function cadastrarCliente(cliente: Cliente): void {
  clientes.push(cliente);
}

function verClientes(): Cliente[] {
  return clientes;
}

export { cadastrarCliente, verClientes };
