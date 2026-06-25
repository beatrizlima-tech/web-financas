# 💻 Web Finanças

Frontend desenvolvido com Angular para gerenciamento de finanças pessoais, consumindo APIs REST desenvolvidas em Spring Boot.

O projeto faz parte de um ecossistema de aplicações criado para demonstrar conhecimentos em desenvolvimento Full Stack, integração entre frontend e backend, autenticação com JWT e arquitetura baseada em APIs.

---

# 🚀 Tecnologias Utilizadas

* Angular
* TypeScript
* Bootstrap 5
* HTML5
* CSS3
* Reactive Forms
* HttpClient

---

# ✨ Funcionalidades

### Implementadas

* Tela de autenticação
* Formulário reativo
* Consumo da API de autenticação
* Integração com backend utilizando HttpClient
* Interface responsiva com Bootstrap

### Em desenvolvimento

* Cadastro de usuários
* Dashboard
* Controle financeiro
* Gerenciamento de receitas
* Gerenciamento de despesas
* Persistência do Token JWT
* Controle de sessão
* Proteção de rotas
* Integração completa com as APIs do sistema

---

# 🏗️ Arquitetura

```text
Web Finanças (Angular)
        │
        ▼
Usuários API (Spring Boot)
        │
        ▼
Autenticação JWT
        │
        ▼
API de Pagamentos
```

---

# 📂 Estrutura do Projeto

```text
src/
├── app/
│   ├── autenticar-usuario/
│   ├── criar-usuario/
│   ├── dashboard/
│   ├── app.routes.ts
│   └── app.config.ts
├── assets/
└── environments/
```

---

# 🔗 Integração

O frontend consome APIs REST para:

* Autenticação de usuários
* Cadastro de usuários
* Consulta de informações do usuário autenticado
* Gerenciamento financeiro

---

# ▶️ Como Executar

## Pré-requisitos

* Node.js
* Angular CLI

## Clonar o projeto

```bash
git clone https://github.com/beatrizlima-tech/web-financas.git
```

## Instalar dependências

```bash
npm install
```

## Executar

```bash
ng serve
```

A aplicação ficará disponível em:

```text
http://localhost:4200
```

---

# 📚 Objetivo

Este projeto foi desenvolvido para consolidar conhecimentos em Angular, integração com APIs REST, autenticação baseada em JWT e construção de interfaces modernas para aplicações web.

O frontend faz parte de um ecossistema Full Stack desenvolvido em conjunto com APIs Spring Boot.

---

# 🔗 Projetos Relacionados

* Usuários API — Responsável pela autenticação e gerenciamento de usuários.
* API Pagamentos — Responsável pelo gerenciamento das transações financeiras.

---

# 👩‍💻 Autora

**Beatriz Lima de Oliveira**

GitHub:
https://github.com/beatrizlima-tech
