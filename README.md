# 💰 Web Finanças

![Angular](https://img.shields.io/badge/Angular-21-red?style=for-the-badge\&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge\&logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple?style=for-the-badge\&logo=bootstrap)
![JWT](https://img.shields.io/badge/JWT-Autenticação-black?style=for-the-badge\&logo=jsonwebtokens)
![REST API](https://img.shields.io/badge/REST%20API-Integration-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=for-the-badge)

---

# 📌 Sobre o projeto

O **Web Finanças** é uma aplicação frontend desenvolvida com **Angular** para gerenciamento de finanças pessoais.

A aplicação consome APIs REST desenvolvidas com **Java** e **Spring Boot**, permitindo que o usuário realize seu cadastro, autenticação e, futuramente, gerencie receitas, despesas e saldo financeiro em uma interface moderna, intuitiva e responsiva.

O projeto foi desenvolvido para praticar conceitos de **Angular**, **Reactive Forms**, consumo de APIs REST, autenticação utilizando **JWT** e integração entre frontend e backend.

---

# ✨ Funcionalidades

## Implementadas

* Cadastro de usuários
* Autenticação de usuários (Login)
* Validação de formulários com Reactive Forms
* Validação de senha forte
* Confirmação de senha
* Aceite obrigatório dos Termos de Uso
* Modal de Termos de Uso
* Comunicação com API REST
* Exibição de mensagens de sucesso e erro
* Interface responsiva utilizando Bootstrap 5

## Em desenvolvimento

* Dashboard financeiro
* Cadastro de receitas
* Cadastro de despesas
* Controle de saldo
* Proteção de rotas
* Persistência do token JWT
* Controle de sessão

---

# 🛠 Tecnologias utilizadas

* Angular 21
* TypeScript
* HTML5
* CSS3
* Bootstrap 5
* Reactive Forms
* HttpClient
* JWT
* REST API

---

# 📂 Estrutura do projeto

```text
src
├── app
│   ├── autenticar-usuario
│   ├── criar-usuario
│   ├── dashboard
│   ├── app.routes.ts
│   └── app.config.ts
├── assets
└── environments
```

---

# 📊 Arquitetura

```text
Usuário
     │
     ▼
Web Finanças (Angular)
     │
 HttpClient
     │
     ▼
API Usuários (Spring Boot)
     │
     ▼
JWT
     │
     ▼
APIs Financeiras
```

---

# ▶️ Como executar o projeto

Clone este repositório:

```bash
git clone https://github.com/beatrizlima-tech/web-financas.git
```

Acesse a pasta do projeto:

```bash
cd web-financas
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
ng serve
```

Acesse:

```text
http://localhost:4200
```

> **Importante:** Para utilizar todas as funcionalidades da aplicação, é necessário que a API de usuários esteja em execução.

---

# 🚀 Próximas implementações

* Dashboard financeiro
* Cadastro de categorias
* Cadastro de receitas
* Cadastro de despesas
* Relatórios financeiros
* Gráficos e indicadores
* AuthGuard
* JWT Interceptor
* Testes automatizados

---

# 👩‍💻 Autora

**Beatriz Lima de Oliveira**

* GitHub: https://github.com/beatrizlima-tech
* LinkedIn: https://www.linkedin.com/in/beatrizlima-tech
