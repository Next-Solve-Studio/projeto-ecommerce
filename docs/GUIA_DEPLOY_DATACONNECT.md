# Guia Completo: Configuração e Deploy do Firebase SQL Connect (Data Connect)

Este guia documenta o processo passo a passo realizado para configurar, validar e realizar o deploy do esquema de banco de dados relacional para o projeto de e-commerce utilizando o Firebase SQL Connect.

---

## 1. Diagnóstico Inicial

Ao tentar compilar o esquema original (`dataconnect/schema/schema.gql`), foram identificados diversos erros de validação estrutural:
- **Uso incorreto de `@ref` em listas**: Tentar definir manualmente o lado "muitos" de uma relação (ex: `addresses: [Address!] @ref(...)`).
- **Chaves primárias inválidas**: Inclusão de campos opcionais (nullable) em chaves compostas.
- **Relações 1:1 redundantes**: Conflitos na definição de chaves estrangeiras automáticas.

---

## 2. Refatoração do Esquema (`schema.gql`)

O arquivo foi reestruturado seguindo as melhores práticas do Data Connect:
- **IDs Padronizados**: Adição de `id: UUID! @default(expr: "uuidV4()")` em todas as tabelas para simplificar referências.
- **Relações Automáticas**: Remoção de campos de array manuais. O Data Connect agora gera campos automáticos como `productVariations_on_product` para navegação.
- **Unicidade Garantida**: Uso de `@unique(fields: [...])` para restrições de negócio sem comprometer a chave primária.

---

## 3. Criação de Operações Iniciais (`queries.gql`)

Para que o SDK pudesse ser gerado e o serviço compilado, foram criadas consultas básicas em `dataconnect/example/queries.gql`:
- `ListProducts`: Listagem pública de produtos.
- `GetProductById`: Busca detalhada de um produto, incluindo suas variações e galeria de imagens.

---

## 4. Comandos Utilizados e Logs do Processo

Abaixo estão os comandos executados na ordem correta para o sucesso do deploy:

### Passo A: Validação e Compilação Local
Este comando verifica erros de sintaxe e gera o SDK localmente.
```bash
firebase dataconnect:compile
```
*   **Resultado**: Gerou o SDK em `src/dataconnect-generated` e validou o esquema contra o compilador do Firebase.

### Passo B: Migração do Banco de Dados (Cloud SQL)
Como o banco de dados no Google Cloud estava vazio ou incompatível, foi necessário criar a estrutura física das tabelas no PostgreSQL.
```bash
firebase dataconnect:sql:migrate
```
*   **Logs Importantes**:
    - Instalação da extensão `"uuid-ossp"`.
    - Criação dos ENUMs `payment_method` e `order_status`.
    - Criação de todas as tabelas (`user`, `product`, `order`, `cart_item`, etc.).
    - Criação de índices e chaves estrangeiras (Constraints).

### Passo C: Deploy do Serviço
Com o banco de dados pronto, o serviço do Data Connect foi publicado.
```bash
firebase deploy --only dataconnect
```
*   **Resultado**: O endpoint GraphQL foi ativado e o conector `example` foi publicado.

---

## 5. Resumo da Estrutura Final

- **Localização**: `southamerica-east1` (São Paulo)
- **Serviço**: `nextsolve-atividade-ecommerce-service`
- **Banco de Dados**: `nextsolve-atividade-ecommerce-database` (PostgreSQL)
- **Instância Cloud SQL**: `nextsolve-atividade-ecommerce-instance`

---

## 6. Links Úteis

- **Console do Data Connect**: [Acessar Schema e Operações](https://console.firebase.google.com/project/nextsolve-atividade-ecommerce/dataconnect/locations/southamerica-east1/services/nextsolve-atividade-ecommerce-service/schema)
- **Documentação Oficial**: [Firebase SQL Connect Quickstart](https://firebase.google.com/docs/sql-connect/quickstart)

---
*Guia gerado automaticamente pelo Gemini CLI em 11 de Maio de 2026.*
