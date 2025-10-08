# 🚀 API Prime Bank (Firebase Functions)

Esta é uma API **RESTful** desenvolvida para simular serviços de um banco digital, incluindo gerenciamento de usuários, contas, transações e investimentos. A API é construída usando **Node.js, Express** e implantada como **Firebase Functions**, utilizando **Firestore** como banco de dados principal e **Firebase Storage** para upload de arquivos.

---

## 🔑 Autenticação

Todas as rotas, exceto a rota de listagem de usuários (apenas para debug), são protegidas por um **Middleware de Autenticação**.

É necessário enviar um **Firebase ID Token** válido no cabeçalho `Authorization` de todas as requisições, no formato:

```
Authorization: Bearer [FIREBASE_ID_TOKEN]
```

---

## 🗺️ Rotas da API

### 👤 Rotas de Usuários (`/users`)

| Método     | Endpoint     | Descrição                                                                           | Corpo da Requisição (JSON)                           | Resposta de Sucesso                  |
| :--------- | :----------- | :---------------------------------------------------------------------------------- | :--------------------------------------------------- | :----------------------------------- |
| **POST**   | `/users/`    | Cria um **novo usuário** no Firestore e uma **Conta Bancária Principal** associada. | `name`, `email`, `telephone`, `acceptTermAndPolice`  | `200 OK` (IDs do Usuário e da Conta) |
| **GET**    | `/users/`    | Lista **todos** os usuários. (Apenas para DEBUG)                                    | N/A                                                  | `200 OK` (Array de usuários)         |
| **GET**    | `/users/:id` | Busca os dados de um usuário pelo seu ID (UID do Firebase Auth).                    | N/A                                                  | `200 OK` (Dados do usuário)          |
| **PUT**    | `/users/:id` | Atualiza dados de um usuário.                                                       | Campos a serem atualizados (ex: `name`, `telephone`) | `200 OK` (Mensagem de sucesso)       |
| **DELETE** | `/users/:id` | Exclui um usuário.                                                                  | N/A                                                  | `200 OK` (Mensagem de sucesso)       |

### 💳 Rotas de Contas Bancárias (`/bankAccounts`)

| Método   | Endpoint            | Descrição                                                                                 | Corpo da Requisição (JSON)                | Resposta de Sucesso              |
| :------- | :------------------ | :---------------------------------------------------------------------------------------- | :---------------------------------------- | :------------------------------- |
| **POST** | `/bankAccounts`     | Cria uma nova conta bancária para o usuário logado.                                       | `initialBalance` (Opcional, padrão $5000) | `201 Created` (ID da nova conta) |
| **GET**  | `/bankAccounts`     | Lista **todas** as contas bancárias (Para fins administrativos ou debug).                 | N/A                                       | `200 OK` (Array de contas)       |
| **GET**  | `/bankAccounts/:id` | Busca uma conta bancária específica. **Requer que o usuário logado seja o proprietário.** | N/A                                       | `200 OK` (Dados da conta)        |

### 💰 Rotas de Transações (`/transactions`)

| Método     | Endpoint            | Descrição                                                         | Detalhes                                                                           | Resposta de Sucesso                      |
| :--------- | :------------------ | :---------------------------------------------------------------- | :--------------------------------------------------------------------------------- | :--------------------------------------- |
| **POST**   | `/transactions`     | Realiza uma **transferência atômica** de saldo entre duas contas. | **Corpo:** `fromAccountId`, `toAccountId`, `amount`, `anexo` (Opcional)            | `201 Created` (IDs das transações)       |
| **GET**    | `/transactions`     | Lista as transações do **usuário logado**.                        | **Query Params:** `minAmount`, `maxAmount`, `month` (formato `MM-YY` ou `MM-YYYY`) | `200 OK` (Array de transações filtradas) |
| **GET**    | `/transactions/:id` | Busca uma transação específica. **Verifica a propriedade.**       | N/A                                                                                | `200 OK` (Dados da transação)            |
| **PUT**    | `/transactions/:id` | Atualiza campos de uma transação. **Verifica a propriedade.**     | **Corpo:** Campos a serem atualizados                                              | `200 OK` (Mensagem de sucesso)           |
| **DELETE** | `/transactions/:id` | Exclui uma transação. **Verifica a propriedade.**                 | N/A                                                                                | `200 OK` (Mensagem de sucesso)           |

### 📈 Rotas de Investimentos (`/investments`)
PS: Em construção

| Método     | Endpoint           | Descrição                                                      | Corpo da Requisição (JSON)            | Resposta de Sucesso                |
| :--------- | :----------------- | :------------------------------------------------------------- | :------------------------------------ | :--------------------------------- |
| **POST**   | `/investments`     | Registra um novo investimento para o usuário logado.           | `type`, `value`, `name`, `accountId`  | `201 Created` (ID do investimento) |
| **GET**    | `/investments`     | Lista todos os investimentos do **usuário logado**.            | N/A                                   | `200 OK` (Array de investimentos)  |
| **GET**    | `/investments/:id` | Busca um investimento específico. **Verifica a propriedade.**  | N/A                                   | `200 OK` (Dados do investimento)   |
| **PUT**    | `/investments/:id` | Atualiza dados de um investimento. **Verifica a propriedade.** | **Corpo:** Campos a serem atualizados | `200 OK` (Mensagem de sucesso)     |
| **DELETE** | `/investments/:id` | Exclui um investimento. **Verifica a propriedade.**            | N/A                                   | `200 OK` (Mensagem de sucesso)     |

### 📎 Rotas de Upload (`/upload`) 
PS: Em construção

| Método   | Endpoint  | Descrição                                                                             | Corpo da Requisição (Form Data)        | Resposta de Sucesso               |
| :------- | :-------- | :------------------------------------------------------------------------------------ | :------------------------------------- | :-------------------------------- |
| **POST** | `/upload` | Faz o upload de um arquivo para o **Firebase Storage**, salvando-o em `users/[UID]/`. | **Form Data:** `arquivo` (tipo `file`) | `200 OK` (URL pública do arquivo) |

**Detalhes do Upload:** O upload utiliza `multer.memoryStorage()` e envia o arquivo via **stream** para o Firebase Storage. Os arquivos são públicos e têm um `cacheControl` de 1 ano.

---
