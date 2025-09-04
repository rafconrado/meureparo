# MeuReparo 🛠️

*Conectando clientes a prestadores de serviços de forma rápida e confiável.*

![Status](https://img.shields.io/badge/Status-Em%20desenvolvimento-yellow)

---

## 📝 Sobre o Projeto

**MeuReparo** é uma plataforma full-stack (Mobile + Web) projetada para ser o ponto de encontro entre clientes que precisam de reparos ou serviços e os melhores profissionais do mercado. O projeto possui dois ambientes distintos: um para o **cliente**, que pode buscar e contratar serviços, e outro para o **prestador**, que pode oferecer seu trabalho, gerenciar agendamentos e construir sua reputação.

Atualmente, o projeto está na fase de **desenvolvimento e integração** entre o backend (API) e o frontend (aplicativo).

## ✨ Funcionalidades Principais

O escopo do projeto inclui as seguintes funcionalidades:

#### ✔️ Em Andamento
* **Autenticação Dupla:** Sistema de cadastro e login seguro com JWT para Clientes e Prestadores de Serviço.
* **Estrutura da API RESTful:** Construção dos endpoints principais para manipulação de dados.
* **Base do App Mobile:** Telas de navegação iniciais, componentes de UI e configuração do estado.
* **Integração API-App:** Conectando o frontend ao backend para o fluxo de autenticação.

#### 📝 Planejadas
* **Perfis Detalhados:** Perfis completos para prestadores (com portfólio, especialidades) e clientes (com histórico de serviços).
* **Busca e Filtragem Avançada:** Ferramentas para que clientes encontrem o profissional ideal por serviço, localização e avaliação.
* **Sistema de Agendamento:** Interface para marcar, confirmar e cancelar serviços.
* **Avaliações e Comentários:** Sistema de rating para construir confiança na plataforma.
* **Notificações em Tempo Real**.

---

## 🚀 Tecnologias Utilizadas

Este projeto é construído com uma arquitetura de microsserviços, utilizando tecnologias modernas para o backend e o frontend.

### 💻 Frontend (React Native com Expo)
* **Framework:** [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Navegação:** [React Navigation](https://reactnavigation.org/)
* **Estilização:** [Styled Components](https://styled-components.com/) e [Expo Vector Icons](https://docs.expo.dev/guides/icons/)
* **Armazenamento Local:** [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) e [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)

### ☁️ Backend (Node.js)
* **Ambiente de Execução:** [Node.js](https://nodejs.org/en/)
* **Framework:** [Express.js](https://expressjs.com/pt-br/)
* **Banco de Dados:** [SQLite3](https://www.sqlite.org/index.html) (para desenvolvimento)
* **Autenticação:** [JSON Web Tokens (JWT)](https://jwt.io/)
* **Criptografia de Senhas:** [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
* **Gerenciamento de CORS:** [CORS](https://github.com/expressjs/cors)
* **Ferramentas de Desenvolvimento:** [Nodemon](https://nodemon.io/)

---

## ⚙️ Começando

Para rodar este projeto localmente, você precisará ter `Node.js`, `npm` (ou `yarn`) e o `Expo CLI` instalados.

### Pré-requisitos
* Node.js (v18+ recomendado)
* NPM ou Yarn
* Expo CLI: `npm install -g expo-cli`

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://SEU_LINK_DO_REPOSITORIO/meureparo.git
    cd meureparo
    ```

2.  **Configure e rode o Backend (`api-backend`):**
    ```bash
    # Navegue até a pasta do backend
    cd api-backend

    # Instale as dependências
    npm install

    # Inicie o servidor em modo de desenvolvimento
    npm start
    ```
    > O servidor backend estará rodando em `http://localhost:3333` (ou a porta que você configurar).

3.  **Configure e rode o Frontend (`myapp`):**
    ```bash
    # Volte para a raiz e navegue até a pasta do frontend
    cd ../myapp

    # Instale as dependências
    npm install

    # Inicie o servidor de desenvolvimento do Expo
    npm start
    ```
    > Após iniciar, o Expo abrirá uma aba no navegador. Você pode escanear o QR Code com o app Expo Go no seu celular ou rodar em um emulador (Android/iOS).

---

## 🗺️ Roadmap do Projeto

* [x] Estruturação dos projetos `backend` e `frontend`.
* [x] Finalizar fluxo de Cadastro e Login ponta a ponta.
* [x] Desenvolver os endpoints para CRUD de Serviços.
* [ ] Criar as telas de Perfil de Usuário (Cliente e Prestador).
* [ ] Implementar o sistema de busca e listagem de serviços no app.

---

Feito com ❤️ por **Rafael Conrado**.
