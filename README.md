# 💻 Web Finanças

![Angular](https://img.shields.io/badge/Angular-21-red?style=for-the-badge\&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple?style=for-the-badge\&logo=bootstrap)
![JWT](https://img.shields.io/badge/JWT-Autenticação-black?style=for-the-badge\&logo=jsonwebtokens)
![REST API](https://img.shields.io/badge/REST%20API-Integration-blue?style=for-the-badge)
![Build](https://img.shields.io/badge/build-em%20desenvolvimento-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=for-the-badge)

---

# 📌 Sobre o projeto

O **Web Finanças** é uma aplicação frontend desenvolvida com **Angular** para gerenciamento financeiro pessoal, consumindo APIs REST desenvolvidas com **Java** e **Spring Boot**.

O projeto faz parte de um ecossistema Full Stack criado para praticar autenticação com JWT, integração entre frontend e backend, consumo de APIs REST e construção de interfaces modernas utilizando Angular.

---

# 🚀 Funcionalidades

### Implementadas

* Tela de autenticação
* Formulários reativos
* Integração com API de autenticação
* Consumo de APIs utilizando HttpClient
* Interface responsiva com Bootstrap

### Em desenvolvimento

* Cadastro de usuários
* Dashboard financeiro
* Cadastro de receitas
* Cadastro de despesas
* Controle de saldo
* Persistência do token JWT
* Proteção de rotas
* Controle de sessão
* Integração completa com as APIs do sistema

---

# 🧱 Tecnologias Utilizadas

* Angular
* TypeScript
* Bootstrap 5
* HTML5
* CSS3
* Reactive Forms
* HttpClient
* JWT
* REST API

---

# 🏗️ Estrutura do Projeto

```text
src/

├── app
│   ├── autenticar-usuario
│   ├── criar-usuario
│   ├── dashboard
│   ├── app.routes.ts
│   └── app.config.ts
│
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
      ▼
HttpClient
      │
      ▼
Usuários API (Spring Boot)
      │
      ▼
JWT
      │
      ▼
Demais APIs Financeiras
```

---

# 🔗 Integração

O frontend realiza integração com APIs REST responsáveis por:

* Autenticação de usuários
* Cadastro de usuários
* Consulta do usuário autenticado
* Gerenciamento financeiro

---

# ⚙️ Como Executar

## 1. Clonar o repositório

```bash
git clone https://github.com/beatrizlima-tech/web-financas.git
```

---

## 2. Instalar as dependências

```bash
npm install
```

---

## 3. Executar a aplicação

```bash
ng serve
```

---

## 4. Acessar

```text
http://localhost:4200
```

---

# 📚 Conceitos Aplicados

* Componentização
* SPA (Single Page Application)
* Consumo de APIs REST
* Reactive Forms
* HttpClient
* Integração Frontend e Backend
* Autenticação JWT
* Organização em módulos
* Responsividade
* Angular Routing

---

# 🔗 Projetos Relacionados

* **API Usuários**

  * Responsável pela autenticação e gerenciamento de usuários.

* **API Pagamentos**

  * Responsável pelo gerenciamento das transações financeiras.

---

# 📌 Melhorias Futuras

* Implementar AuthGuard
* Implementar JWT Interceptor
* Criar dashboard financeiro completo
* Implementar controle de receitas
* Implementar controle de despesas
* Adicionar gráficos financeiros
* Melhorar experiência do usuário
* Criar testes automatizados
* Publicar aplicação em produção

---

# 👩‍💻 Autora

**Beatriz Lima de Oliveira**

🔗 GitHub

https://github.com/beatrizlima-tech

💼 LinkedIn

https://www.linkedin.com/in/beatrizlima-tech
