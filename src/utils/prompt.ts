import promptSync = require("prompt-sync");
const prompt = promptSync({ sigint: true });

const promptAzul = (mensagem: string): string =>
  prompt(`\x1b[34m${mensagem}\x1b[0m`);

const promptVerde = (mensagem: string): string =>
  prompt(`\x1b[32m${mensagem}\x1b[0m`);

const promptVermelho = (mensagem: string): string =>
  prompt(`\x1b[31m${mensagem}\x1b[0m`);

const promptCinza = (mensagem: string): string =>
  prompt(`\x1b[90m${mensagem}\x1b[0m`);

export { promptAzul, promptCinza, promptVermelho, promptVerde, prompt };
