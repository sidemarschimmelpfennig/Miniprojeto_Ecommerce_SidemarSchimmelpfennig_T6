import promptSync = require("prompt-sync");

const prompt = promptSync({ sigint: true });

export function tratarErro(erro: unknown, tentarNovamente: () => void): void {
  console.log("\n=== OCORREU UM ERRO ===");

  if (erro instanceof Error) {
    console.log(`Mensagem: ${erro.message}`);
  } else {
    console.log("Erro:", erro);
  }

  console.log("\n1 - Tentar novamente");
  console.log("0 - Voltar ao menu anterior");

  const opcao = prompt("Escolha uma opção: ");

  switch (opcao) {
    case "1":
      tentarNovamente();
      break;

    case "0":
      console.log("Voltando ao menu anterior...");
      break;

    default:
      console.log("Opção inválida. Nenhuma ação executada.");
      break;
  }
}
