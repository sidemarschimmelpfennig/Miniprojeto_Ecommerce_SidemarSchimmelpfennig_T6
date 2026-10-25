const logAzul = (mensagem: string): void =>
  console.log(`\x1b[34m${mensagem}\x1b[0m`);

const logVerde = (mensagem: string): void =>
  console.log(`\x1b[32m${mensagem}\x1b[0m`);

const logVermelho = (mensagem: string): void =>
  console.log(`\x1b[31m${mensagem}\x1b[0m`);

const logCinza = (mensagem: string): void =>
  console.log(`\x1b[90m${mensagem}\x1b[0m`);

const logAmarelo = (mensagem: string): void =>
  console.log(`\x1b[33m${mensagem}\x1b[0m`);

export { logAzul, logCinza, logVerde, logVermelho, logAmarelo };
