const db = require("../../database.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Use a variável de ambiente para o segredo do JWT
const JWT_SECRET = process.env.JWT_SECRET || "seu_segredo_padrao_para_testes";

// --- FUNÇÕES AUXILIARES MODERNIZADAS ---

const dbGet = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbRun = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      // Usamos 'function' para ter acesso a 'this'
      if (err) reject(err);
      else resolve({ lastID: this.lastID }); // Retornamos o ID do item inserido
    });
  });
};

// Função para gerar o token
const generateToken = (id, email, userType) => {
  return jwt.sign({ id, email, userType }, JWT_SECRET, { expiresIn: "1d" });
};

// --- LÓGICA PARA CLIENTES ---

exports.registerClient = async (req, res) => {
  const {
    name,
    cpf,
    email,
    password,
    phone,
    cep,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    comoFicouSabendo,
  } = req.body;

  // Validação dos campos específicos do cliente
  if (!name || !cpf || !email || !password || !phone) {
    return res
      .status(400)
      .json({ message: "Preencha todos os campos obrigatórios." });
  }

  try {
    // 1. Verifica se o cliente já existe
    const existingClient = await dbGet(
      "SELECT * FROM clients WHERE email = ? OR cpf = ?",
      [email, cpf]
    );
    if (existingClient) {
      return res.status(400).json({ message: "Email ou CPF já cadastrado." });
    }

    // 2. Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insere o novo cliente na tabela 'clients'
    const sql = `
      INSERT INTO clients (name, cpf, email, password, phone, cep, logradouro, numero, complemento, bairro, cidade, uf, comoFicouSabendo, userType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      name,
      cpf,
      email,
      hashedPassword,
      phone,
      cep,
      logradouro,
      numero,
      complemento || "",
      bairro,
      cidade,
      uf,
      comoFicouSabendo || "",
      "client",
    ];

    const result = await dbRun(sql, params);
    const newUserId = result.lastID;

    // 4. Gera o token e envia a resposta
    const token = generateToken(newUserId, email, "client");
    res.status(201).json({
      message: "Cliente criado com sucesso!",
      user: { id: newUserId, name, email, userType: "client" },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro no servidor ao registrar cliente.",
      error: error.message,
    });
  }
};

exports.loginClient = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha email e senha." });
  }

  try {
    // 1. Busca o usuário APENAS na tabela 'clients'
    const client = await dbGet("SELECT * FROM clients WHERE email = ?", [
      email,
    ]);
    if (!client) {
      return res.status(404).json({ message: "Usuário ou senha inválidos." });
    }

    // 2. Compara as senhas
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    // 3. Gera o token e envia a resposta
    const token = generateToken(client.id, client.email, "client");
    res.status(200).json({
      message: "Login bem-sucedido!",
      user: {
        id: client.id,
        name: client.name,
        email: client.email,
        userType: "client",
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro no servidor durante o login.",
      error: error.message,
    });
  }
};

// --- LÓGICA PARA PRESTADORES (PROVIDERS) ---

exports.registerProvider = async (req, res) => {
  const {
    name,
    cnpj,
    email,
    password,
    phone,
    cep,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    uf,
    servico,
  } = req.body;

  // Validação dos campos específicos do prestador
  if (!name || !cnpj || !email || !password || !phone || !servico) {
    return res
      .status(400)
      .json({ message: "Preencha todos os campos obrigatórios." });
  }

  try {
    // 1. Verifica se o prestador já existe
    const existingProvider = await dbGet(
      "SELECT * FROM providers WHERE email = ? OR cnpj = ?",
      [email, cnpj]
    );
    if (existingProvider) {
      return res.status(400).json({ message: "Email ou CNPJ já cadastrado." });
    }

    // 2. Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insere o novo prestador na tabela 'providers' (note a coluna 'servico')
    const sql = `
      INSERT INTO providers (name, cnpj, email, password, phone, cep, logradouro, numero, complemento, bairro, cidade, uf, servico, userType)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      name,
      cnpj,
      email,
      hashedPassword,
      phone,
      cep,
      logradouro,
      numero,
      complemento || "",
      bairro,
      cidade,
      uf,
      servico,
      "provider",
    ];

    const result = await dbRun(sql, params);
    const newUserId = result.lastID;

    // 4. Gera o token e envia a resposta
    const token = generateToken(newUserId, email, "provider");
    res.status(201).json({
      message: "Prestador criado com sucesso!",
      user: { id: newUserId, name, email, userType: "provider" },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro no servidor ao registrar prestador.",
      error: error.message,
    });
  }
};

exports.loginProvider = async (req, res) => {
  console.log(
    "\n--- [BACKEND] ROTA /auth/login/provider RECEBEU UMA REQUISIÇÃO! ---"
  );
  const { email, password } = req.body;
  console.log(`[BACKEND] Tentando logar com o email: ${email}`); // Log adicional

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha email e senha." });
  }

  try {
    // 1. Busca o usuário APENAS na tabela 'providers'
    const provider = await dbGet("SELECT * FROM providers WHERE email = ?", [
      email,
    ]);
    if (!provider) {
      return res.status(404).json({ message: "Usuário ou senha inválidos." });
    }

    // 2. Compara as senhas
    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    // 3. Gera o token e envia a resposta
    const token = generateToken(provider.id, provider.email, "provider");
    res.status(200).json({
      message: "Login bem-sucedido!",
      user: {
        id: provider.id,
        name: provider.name,
        email: provider.email,
        userType: "provider",
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erro no servidor durante o login.",
      error: error.message,
    });
  }
};

// --- LÓGICA UPDATE DE PERFIL ---
exports.updateProfile = async (req, res) => {
  console.log("\n--- [DEBUG] Iniciando updateProfile ---");
  try {
    // 1. O ID e o TIPO do usuário vêm do token
    console.log("[DEBUG] Conteúdo do req.user (do token):", req.user);
    const { id: userId, userType } = req.user;

    // 2. Pegamos os novos dados que o app enviou
    console.log("[DEBUG] Dados recebidos no req.body:", req.body);
    const { name, email } = req.body;

    // Verificação de segurança
    if (!userId || !userType) {
      console.error("[DEBUG] ERRO: ID ou userType faltando no token!");
      return res.status(403).json({ message: "Token inválido ou malformado." });
    }

    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Nome e e-mail são obrigatórios." });
    }

    let tableName;
    // 3. Decidimos qual tabela usar
    if (userType === "client") {
      tableName = "clients";
    } else if (userType === "provider") {
      tableName = "providers";
    } else {
      console.error(
        `[DEBUG] ERRO: userType ('${userType}') inválido no token.`
      );
      return res.status(403).json({ message: "Tipo de usuário inválido." });
    }
    console.log(`[DEBUG] Decisão: A tabela a ser atualizada é '${tableName}'`);

    // 4. (Opcional, mas recomendado) Verifica se o novo e-mail já está em uso
    const existingUser = await dbGet(
      `SELECT id FROM ${tableName} WHERE email = ? AND id != ?`,
      [email, userId]
    );

    if (existingUser) {
      console.warn(
        `[DEBUG] AVISO: Tentativa de atualizar para um e-mail que já existe ('${email}').`
      );
      return res.status(409).json({ message: "Este e-mail já está em uso." });
    }

    // 5. Executa o comando UPDATE na tabela correta
    const updateSql = `UPDATE ${tableName} SET name = ?, email = ? WHERE id = ?`;
    console.log(`[DEBUG] Executando SQL: ${updateSql}`);
    console.log(`[DEBUG] Parâmetros: [${name}, ${email}, ${userId}]`);

    // IMPORTANTE: Vamos ver o que o db.run realmente retorna
    const result = await dbRun(updateSql, [name, email, userId]);
    console.log("[DEBUG] Resultado da operação db.run:", result); // << MUITO IMPORTANTE

    // 6. Busca os dados atualizados do usuário para retornar na resposta
    const updatedUser = await dbGet(
      `SELECT id, name, email, userType FROM ${tableName} WHERE id = ?`,
      [userId]
    );
    console.log(
      "[DEBUG] Dados encontrados no banco APÓS o update:",
      updatedUser
    );

    // 7. Envia a resposta de sucesso de volta para o app
    console.log("--- [DEBUG] Operação finalizada com sucesso. ---");
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("--- [DEBUG] ERRO CAPTURADO NO CATCH ---");
    console.error(error);
    res.status(500).json({
      message: "Ocorreu um erro interno ao atualizar o perfil.",
      error: error.message,
    });
  }
};
