# 🛒 Sistema de Gerenciamento de E-commerce

> Mini-Projeto Avaliativo - Módulo 1 - Semana 07  
> **Desenvolvedor Back-End Node [T6]**

---

## Identificação

- **Estudante:** Sidemar Schimmelpfennig
- **Turma:** T6 - Back-End Node

---

## Objetivo da Aplicação

Aplicação desenvolvida em **TypeScript** e executada em **Node.js** para gerenciar as operações de um mini e-commerce via terminal (CLI). O sistema permite administrar catálogo de produtos, clientes, montagem de carrinho com controle de estoque, fechamento atômico de pedidos com histórico de preços e relatórios analíticos de vendas.

---

## Tecnologias Utilizadas

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

- **Linguagem:** TypeScript (tipagem estrita com `noUncheckedIndexedAccess`)
- **Runtime:** Node.js
- **Execução e Compilação:** `tsx` / `tsc`
- **Entrada de dados:** `prompt-sync`

---

## Estrutura de Arquivos

```text
mini-ecommerce/
├── dist/                  # Código JavaScript compilado
├── src/
│   ├── types.ts           # Definição das interfaces e tipos centrais (Produto, Cliente, Pedido, etc.)
│   ├── produtos.ts        # Catálogo, cadastro, buscas por ID/nome, edição, exclusão e estoque
│   ├── clientes.ts        # Cadastro, validação de nome/e-mail e consultas de clientes
│   ├── carrinho.ts        # Operações do carrinho, cálculo de subtotais e validação de disponibilidade
│   ├── pedidos.ts         # Finalização atômica, histórico de preços e consultas
│   ├── relatorios.ts      # Funções de consolidação de dados (vendas, estoque, ticket médio, ranking)
│   ├── main.ts            # Ponto de entrada com menus interativos organizados em níveis visuais
│   └── utils/
│       ├── console.ts     # Funções utilitárias de cores ANSI no terminal
│       └── prompt.ts      # Funções de captura de dados no terminal
├── package.json           # Configuração de scripts e dependências
├── tsconfig.json          # Configuração do compilador TypeScript
└── README.md              # Documentação oficial do projeto
```

---

## Como Compilar e Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm

### Passo a passo

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/sidemarschimmelpfennig/mini-ecommerce.git
   cd mini-ecommerce
   ```

2. **Instalar as dependências:**

   ```bash
   npm install
   ```

3. **Compilar o código TypeScript:**

   ```bash
   npm run build
   ```

4. **Executar a aplicação:**

   ```bash
   # Execução direta com tsx:
   npm start

   # Ou modo desenvolvimento (watch):
   npm run dev

   # Ou após compilar:
   node dist/main.js
   ```

---

## Funcionalidades Implementadas

### 1. Clientes

- Cadastro com validação de nome completo (mínimo nome e sobrenome) e formato de e-mail.
- Impedimento de cadastro de e-mails duplicados.
- Busca individual por ID com tratamento amigável de erros.
- Listagem geral de todos os clientes cadastrados.
- Inicialização prévia com 3 clientes para testes imediatos.

### 2. Produtos

- Cadastro de novos produtos com categoria, preço e estoque.
- Busca individual por identificador (ID).
- Busca dinâmica por parte do nome do produto (_case-insensitive_).
- Listagem geral de produtos do catálogo.
- Edição dos dados de produtos cadastrados.
- Exclusão com confirmação de segurança.
- Inicialização com 5 produtos no catálogo.

### 3. Carrinho de Compras

- Adição de produtos com verificação de estoque disponível.
- Se o mesmo produto for adicionado novamente, atualiza a quantidade em vez de duplicar itens.
- Remoção de itens com confirmação e exibição do nome do produto.
- Alteração manual da quantidade de itens com trava de estoque.
- Visualização do carrinho com cálculo automático de subtotal por item e total geral.
- Atalho direto para fechamento de pedido informando o cliente.

### 4. Pedidos

- Fechamento de compras validando existência do cliente e itens no carrinho.
- **Operação Atômica:** validação de todos os itens antes de alterar qualquer estoque (não registra pedidos parciais).
- **Preço Histórico:** registra o preço praticado no exato momento da compra, preservando pedidos anteriores contra alterações futuras no catálogo.
- Redução automática do estoque após sucesso.
- Consulta de todos os pedidos registrados com detalhes completos de cada item.
- Consulta filtrada dos pedidos de um cliente específico.
- Pré-carregado com 3 pedidos históricos.

### 5. Relatórios Analíticos

- **Relatório de Produtos:** total de itens no catálogo e preço médio.
- **Relatório de Estoque:** unidades totais, valor patrimonial imobilizado e identificação de estoque baixo ou esgotado.
- **Relatório de Vendas:** total de pedidos, total de itens vendidos, faturamento geral e ticket médio.
- **Vendas por Cliente:** ranking dos clientes que mais investiram na loja (ordenado por faturamento).

---

## Regras de Negócio e Validações

- **Integridade de IDs:** identificadores gerados de forma única e sequencial.
- **Preços e Quantidades:** preços devem ser estritamente maiores que zero; quantidades e estoques devem ser números inteiros não negativos.
- **Consistência de Estoque:** não é permitido adicionar ao carrinho nem comprar quantidades acima do saldo disponível.
- **Validação de Nomes:** exige nome completo válido, aceitando acentos, hífens e apóstrofos (ex: _D'Ávila_, _Jean-Paul_).
- **Exclusividade de E-mail:** nenhum cliente pode ser cadastrado com um e-mail já existente.

---

## Limitações Conhecidas do Sistema

- **Persistência em Memória:** os dados são mantidos em memória durante a execução do processo; reiniciar o programa restaura os dados iniciais de fábrica.
- **Interface CLI:** o sistema opera exclusivamente via linha de comando no terminal interativo.
- **Simulação Comercial:** não possui integração com gateways de pagamento bancário, cálculo de frete externo (Correios/transportadora) ou emissão de nota fiscal.
