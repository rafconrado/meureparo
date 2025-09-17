# MEUReparo 🛠️

*Conectando clientes a prestadores de serviços de forma rápida e confiável.*

![Status](https://img.shields.io/badge/Status-Em%20desenvolvimento-yellow)

---

## 📝 Sobre o Projeto

**MEUReparo** é uma plataforma full-stack (Mobile + Backend) projetada para ser o ponto de encontro entre clientes que precisam de reparos ou serviços e os melhores profissionais do mercado. O projeto possui dois ambientes distintos: um para o **cliente**, que pode buscar e contratar serviços, e outro para o **prestador**, que pode oferecer seu trabalho e gerenciar seus anúncios.

Atualmente, o projeto concluiu uma fase crucial de desenvolvimento do backend, com a API de autenticação e gerenciamento de anúncios totalmente funcional e validada. O foco agora se volta para a implementação dessas funcionalidades no aplicativo mobile.

## ✨ Funcionalidades Principais

O escopo do projeto inclui as seguintes funcionalidades:

#### ✅ Concluídas Recentemente
* **Autenticação Robusta:** Sistema de cadastro e login seguro com JWT para Clientes e Prestadores. Inclui validação de dados duplicados (CPF, CNPJ, E-mail) para garantir a integridade da base de dados.
* **API RESTful para Anúncios:** Endpoints com CRUD completo (Criar, Ler, Atualizar, Deletar) para que os prestadores possam gerenciar seus anúncios de serviço. As rotas de manipulação de dados são protegidas, garantindo que apenas o dono do anúncio possa modificá-lo.
* **Integração e Validação:** Todo o fluxo de autenticação e criação de anúncios foi validado ponta a ponta através de testes com o Postman.
* **Documentação da API:** Uma página de documentação estática e interativa foi criada para detalhar todos os endpoints disponíveis, facilitando o desenvolvimento do frontend.

#### 📝 Planejadas
* **Perfis Detalhados:** Perfis completos para prestadores (com portfólio, especialidades) e clientes (com histórico de serviços).
* **Busca e Filtragem Avançada:** Ferramentas para que clientes encontrem o profissional ideal por serviço, localização e avaliação.
* **Sistema de Agendamento:** Interface para marcar, confirmar e cancelar serviços.
* **Avaliações e Comentários:** Sistema de rating para construir confiança na plataforma.
* **Notificações em Tempo Real**.

---

## 🚀 Tecnologias Utilizadas

Este projeto é construído utilizando tecnologias modernas para o backend e o frontend.

### 💻 Frontend (React Native com Expo)
* **Framework:** [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Navegação:** [React Navigation](https://reactnavigation.org/)
* **Estilização:** [Styled Components](https://styled-components.com/) e [Expo Vector Icons](https://docs.expo.dev/guides/icons/)
* **Gerenciamento de Estado:** [React Context API](https://react.dev/learn/passing-data-deeply-with-context)
* **Comunicação com API:** [Axios](https://axios-http.com/)

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
    git clone https://SEU_LINK_DO_REPOSITORIO/find-and-fix.git
    cd find-and-fix
    ```

2.  **Configure e rode o Backend (`api-backend`):**
    ```bash
    # Navegue até a pasta do backend
    cd api-backend

    # Instale as dependências
    npm install

    # Inicie o servidor em modo de desenvolvimento
    npm run dev
    ```
    > O servidor backend estará rodando em `http://localhost:3000`.

3.  **Configure e rode o Frontend (`app-mobile`):**
    ```bash
    # Volte para a raiz e navegue até a pasta do frontend
    cd ../app-mobile

    # Instale as dependências
    npm install

    # Inicie o servidor de desenvolvimento do Expo
    npm start
    ```
    > Após iniciar, o Expo abrirá uma aba no navegador. Você pode escanear o QR Code com o app Expo Go no seu celular ou rodar em um emulador (Android/iOS).

---

## 🗺️ Roadmap e Próximos Passos

O backend atingiu um estado estável para as funcionalidades de autenticação e anúncios. O foco agora é construir as interfaces no aplicativo para consumir esses recursos.

* [x] Estruturação dos projetos `backend` e `frontend`.
* [x] **Backend:** Fluxo de Autenticação completo (Cadastro, Login, JWT) para Clientes e Prestadores.
* [x] **Backend:** Validação de dados duplicados (CPF, CNPJ, E-mail).
* [x] **Backend:** CRUD completo para Anúncios (`/ads`).
* [x] **Testes:** Validação de toda a API com Postman, incluindo automação de token.
* [x] **Documentação:** Criação de uma página HTML detalhando todos os endpoints.
* [ ] **Frontend:** Criar o `adService.ts` para consumir os endpoints de anúncios.
* [ ] **Frontend:** Desenvolver a tela para o Prestador criar e gerenciar seus anúncios.
* [ ] **Frontend:** Desenvolver a tela para o Cliente visualizar a lista de anúncios disponíveis.
* [ ] **Frontend:** Implementar a funcionalidade de "Atualizar Perfil" nas telas de usuário.
* [ ] **Backend & Frontend:** Iniciar o desenvolvimento do sistema de Agendamentos.

---

Feito com ❤️ por **Rafael Conrado**.
