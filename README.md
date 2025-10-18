# MEUReparo 🛠️

_Conectando clientes a prestadores de serviços de forma rápida e confiável._

![Status](https://img.shields.io/badge/Status-Em%20desenvolvimento-yellow)

---

## 📝 Sobre o Projeto

**MEUReparo** é uma plataforma full-stack (Mobile + Backend) projetada para ser o ponto de encontro entre clientes que precisam de reparos ou serviços e os melhores profissionais do mercado. O projeto possui dois ambientes distintos: um para o **cliente**, que pode buscar e contratar serviços, e outro para o **prestador**, que pode oferecer seu trabalho e gerenciar seus anúncios.

Atualmente, o projeto concluiu uma fase crucial de desenvolvimento do backend, com a API de autenticação e gerenciamento de anúncios totalmente funcional e validada. O foco agora se volta para a implementação dessas funcionalidades no aplicativo mobile.

## ✨ Funcionalidades Principais

O escopo do projeto inclui as seguintes funcionalidades:

#### ✅ Concluídas Recentemente

- **Autenticação Robusta (Backend):** Sistema de cadastro e login seguro com JWT para Clientes e Prestadores, com validação de dados duplicados (CPF/CNPJ, E-mail).
- **API de Anúncios (Backend):** CRUD completo (Criar, Ler, Atualizar, Deletar) para gerenciamento de serviços com upload de imagens e rotas protegidas por autenticação.
- **Gerenciamento de Anúncios (Frontend):** Tela do prestador 100% funcional, permitindo criar, visualizar, editar e excluir anúncios, incluindo o upload de imagens e a correta manipulação de categorias.
- **Fluxo de Dados Otimizado:** Comunicação segura e tipada entre front-end e back-end, com um padrão de formatação de dados (Presenter) no servidor para garantir consistência.
- **Documentação da API:** Página de documentação estática para detalhar todos os endpoints, facilitando o desenvolvimento e a manutenção.

#### 📝 Planejadas

- **Perfis Detalhados:** Perfis completos para prestadores (com portfólio, especialidades) e clientes (com histórico de serviços).
- **Busca e Filtragem Avançada:** Ferramentas para que clientes encontrem o profissional ideal por serviço, localização e avaliação.
- **Sistema de Agendamento:** Interface para marcar, confirmar e cancelar serviços.
- **Avaliações e Comentários:** Sistema de rating para construir confiança na plataforma.
- **Notificações em Tempo Real**.

---

## 🚀 Tecnologias Utilizadas

Este projeto é construído utilizando tecnologias modernas para o backend e o frontend.

### 💻 Frontend (React Native com Expo)

- **Framework:** [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Navegação:** [React Navigation](https://reactnavigation.org/)
- **Estilização:** [Styled Components](https://styled-components.com/) e [Expo Vector Icons](https://docs.expo.dev/guides/icons/)
- **Gerenciamento de Estado:** [React Context API](https://react.dev/learn/passing-data-deeply-with-context)
- **Comunicação com API:** [Axios](https://axios-http.com/)

### ☁️ Backend (Node.js)

- **Ambiente de Execução:** [Node.js](https://nodejs.org/en/)
- **Framework:** [Express.js](https://expressjs.com/pt-br/)
- **Banco de Dados:** [SQLite3](https://www.sqlite.org/index.html) (para desenvolvimento)
- **Autenticação:** [JSON Web Tokens (JWT)](https://jwt.io/)
- **Criptografia de Senhas:** [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- **Gerenciamento de CORS:** [CORS](https://github.com/expressjs/cors)
- **Ferramentas de Desenvolvimento:** [Nodemon](https://nodemon.io/)

---

## ⚙️ Começando

Para rodar este projeto localmente, você precisará ter `Node.js`, `npm` (ou `yarn`) e o `Expo CLI` instalados.

### Pré-requisitos

- Node.js (v18+ recomendado)
- NPM ou Yarn
- Expo CLI: `npm install -g expo-cli`

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://https://github.com/rafconrado/meureparo.git
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

### 🎯 Marcos Atingidos

- [x] **Estrutura Base:** Projetos `backend` e `frontend` configurados e com arquitetura inicial definida.
- [x] **API de Autenticação (Backend):** Fluxo de Cadastro e Login com JWT para Clientes e Prestadores.
- [x] **API de Anúncios (Backend):** CRUD completo e seguro para gerenciamento de serviços, incluindo upload de imagens.
- [x] **Arquitetura do Backend:** Implementação do **Presenter Pattern** para formatar e padronizar as respostas da API, tornando o código mais limpo e escalável.
- [x] **Gerenciamento de Anúncios (Frontend):** Tela do prestador totalmente funcional, permitindo criar, visualizar, editar e excluir anúncios de forma robusta.
- [x] **Fluxo de Dados E2E (End-to-End):** Validação completa do fluxo de dados, desde a seleção de imagem no app até o armazenamento e recuperação via API, com tipagem e tratamento de dados em ambas as pontas.
- [x] **Validação e Documentação:** Testes de todos os endpoints da API via Postman e criação de documentação estática.

### 🚀 Próximos Passos

Com a gestão de anúncios pelo prestador finalizada, o foco se volta para a experiência do cliente e a interação entre os usuários.

- [ ] **Home do Cliente - Busca e Filtros:** Aprimorar a tela principal do cliente para listar todos os anúncios, implementando funcionalidades de **busca por texto** e **filtros por categoria**.
- [ ] **Tela de Detalhes do Anúncio:** Criar uma tela dedicada para o cliente visualizar todas as informações de um serviço: imagem em destaque, descrição completa, preço e informações do prestador.
- [ ] **Perfil Público do Prestador:** Desenvolver a tela de perfil do prestador, que será acessada a partir dos detalhes de um anúncio, mostrando todos os serviços que ele oferece e suas informações de contato.
- [ ] **Gerenciamento de Perfil (Usuário):** Implementar a funcionalidade de "Atualizar Perfil" para que clientes e prestadores possam editar suas próprias informações (nome, senha, etc.).
- [ ] **Sistema de Agendamento (MVP):** Iniciar o desenvolvimento da primeira versão (MVP - Mínimo Produto Viável) do sistema de agendamentos, onde um cliente pode solicitar um serviço a partir da tela de detalhes do anúncio.
- [ ] **Sistema de Avaliações:** Após a conclusão de um serviço, permitir que o cliente avalie o prestador, construindo um sistema de reputação na plataforma.

---

Feito com ❤️ por **Rafael Conrado**.
