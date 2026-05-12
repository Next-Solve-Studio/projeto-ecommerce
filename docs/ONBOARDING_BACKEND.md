# 🚀 Guia de Onboarding: Backend & Data Connect

Bem-vindo ao time! Você é o responsável pela inteligência de dados do nosso e-commerce. Trabalharemos com o **Firebase SQL Connect** (PostgreSQL gerenciado na nuvem). 

---

## 1. Setup Inicial

Antes de começar, garanta que você tem o Node.js instalado e execute os comandos abaixo na raiz do projeto:

```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Fazer login no Firebase (use o email que o líder te adicionou)
npx firebase login

# 3. Selecionar o projeto ativo
npx firebase use nextsolve-atividade-ecommerce
```

---

## 2. Fluxo de Trabalho (O que você faz)

Seu trabalho acontece principalmente dentro da pasta `dataconnect/`. 

### Passo A: Alterar o Schema
Se você precisar adicionar uma tabela ou campo, edite o arquivo `dataconnect/schema/schema.gql`. 

### Passo B: Validar e Gerar SDK
Sempre que mexer no schema, você precisa validar se o GraphQL está correto e atualizar a "ponte" que o frontend usa:
```bash
# Valida o esquema e as queries
npx firebase dataconnect:compile

# Gera o novo SDK para o time
npx firebase dataconnect:sdk:generate
```

---

## 3. Como fazer o Deploy (Publicando no Banco Real)

Como estamos trabalhando direto no Firebase, existem dois tipos de "subida":

### 1. Deploy de Operações (Queries e Mutations)
Se você apenas criou uma query nova ou alterou uma lógica de busca em `queries.gql`, basta rodar:
```bash
npx firebase deploy --only dataconnect
```

### 2. Migração de Banco (Mudança de Tabelas)
Se você adicionou uma **tabela nova** ou um **campo novo** em `schema.gql`, o Firebase precisa alterar o PostgreSQL no Google Cloud. 

1. Primeiro, veja o que vai mudar:
   ```bash
   npx firebase dataconnect:sql:diff
   ```
2. Se estiver tudo certo, aplique a mudança:
   ```bash
   npx firebase dataconnect:sql:migrate
   ```
   *Nota: Se o comando pedir confirmação, revise com o líder antes de dar o "yes" para não apagar dados de teste dos colegas.*

---

## 4. Dicas de Ouro

*   **Não use 'any':** O Data Connect gera tipos automáticos para você em `src/dataconnect-generated/`. Use-os!
*   **Segurança:** Sempre verifique a diretiva `@auth` nas suas queries para garantir que um cliente não consiga ver os dados de outro.
*   **Logs:** Se algo der errado no deploy, o erro costuma ser bem detalhado no terminal. Leia com atenção as mensagens de "Validation Error".