const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../database.js");

// Use a variável de ambiente para o segredo do JWT. É mais seguro.
const JWT_SECRET = process.env.JWT_SECRET || "seu_segredo_padrao_para_testes";

// --- FUNÇÕES AUXILIARES MODERNIZADAS (PROMISIFY) ---
// Transforma as funções de callback do sqlite em Promises para usar com async/await.

/**
 * Executa uma consulta SELECT que retorna uma única linha.
 * @param {string} sql - A instrução SQL.
 * @param {Array} params - Os parâmetros para a consulta.
 * @returns {Promise<Object>} A linha encontrada.
 */
const dbGet = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

/**
 * Executa uma instrução INSERT, UPDATE ou DELETE.
 * @param {string} sql - A instrução SQL.
 * @param {Array} params - Os parâmetros para a consulta.
 * @returns {Promise<Object>} Um objeto com o ID do último item inserido.
 */
const dbRun = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

/**
 * Gera um token JWT para um usuário.
 * @param {number} id - ID do usuário.
 * @param {string} email - Email do usuário.
 * @param {string} userType - 'client' ou 'provider'.
 * @returns {string} O token JWT.
 */
const generateToken = (id, email, userType) => {
  return jwt.sign({ id, email, userType }, JWT_SECRET, { expiresIn: "8h" });
};

// --- CONTROLLERS PARA CLIENTES (CLIENTS) ---

/**
 * Registra um novo CLIENTE.
 */
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
    comoFouSabendo,
  } = req.body;

  if (!name || !cpf || !email || !password || !phone) {
    return res.status(400).json({
      message: "Nome, CPF, email, senha e telefone são obrigatórios.",
    });
  }

  try {
    // 1. Verifica se email ou CPF já existem
    const existingClient = await dbGet(
      "SELECT id FROM clients WHERE email = ? OR cpf = ?",
      [email, cpf]
    );
    if (existingClient) {
      return res.status(409).json({ message: "Email ou CPF já cadastrado." }); // 409 Conflict é mais semântico
    }

    // 2. Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insere o novo cliente
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
      complemento || null,
      bairro,
      cidade,
      uf,
      comoFouSabendo || null,
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
    console.error("[ERROR] registerClient:", error);
    res.status(500).json({
      message: "Erro no servidor ao registrar cliente.",
      error: error.message,
    });
  }
};

/**
 * Realiza o login de um CLIENTE.
 */
exports.loginClient = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha email e senha." });
  }

  try {
    const client = await dbGet("SELECT * FROM clients WHERE email = ?", [
      email,
    ]);
    if (!client) {
      return res.status(401).json({ message: "Email ou senha inválidos." }); // 401 para falha de autenticação
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

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
    console.error("[ERROR] loginClient:", error);
    res.status(500).json({
      message: "Erro no servidor durante o login.",
      error: error.message,
    });
  }
};

// --- CONTROLLERS PARA PRESTADORES (PROVIDERS) ---

/**
 * Registra um novo PRESTADOR.
 */
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

  if (!name || !cnpj || !email || !password || !phone || !servico) {
    return res.status(400).json({
      message: "Nome, CNPJ, email, senha, telefone e serviço são obrigatórios.",
    });
  }

  try {
    // 1. Verifica se email ou CNPJ já existem
    const existingProvider = await dbGet(
      "SELECT id FROM providers WHERE email = ? OR cnpj = ?",
      [email, cnpj]
    );
    if (existingProvider) {
      return res.status(409).json({ message: "Email ou CNPJ já cadastrado." }); // 409 Conflict
    }

    // 2. Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insere o novo prestador
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
      complemento || null,
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
    console.error("[ERROR] registerProvider:", error);
    res.status(500).json({
      message: "Erro no servidor ao registrar prestador.",
      error: error.message,
    });
  }
};

/**
 * Realiza o login de um PRESTADOR.
 */
exports.loginProvider = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha email e senha." });
  }

  try {
    const provider = await dbGet("SELECT * FROM providers WHERE email = ?", [
      email,
    ]);
    if (!provider) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

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
    console.error("[ERROR] loginProvider:", error);
    res.status(500).json({
      message: "Erro no servidor durante o login.",
      error: error.message,
    });
  }
};

// --- CONTROLLER PARA ATUALIZAÇÃO DE PERFIL (GENÉRICO) ---

exports.updateProfile = async (req, res) => {
  try {
    const { id: userId, userType } = req.user; // Vem do middleware verifyToken
    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Nome e e-mail são obrigatórios." });
    }

    // Define a tabela correta com base no tipo de usuário do token
    const tableName = userType === "client" ? "clients" : "providers";

    // Verifica se o novo e-mail já está em uso por outro usuário
    const existingUser = await dbGet(
      `SELECT id FROM ${tableName} WHERE email = ? AND id != ?`,
      [email, userId]
    );
    if (existingUser) {
      return res.status(409).json({ message: "Este e-mail já está em uso." });
    }

    // Executa a atualização
    const sql = `UPDATE ${tableName} SET name = ?, email = ? WHERE id = ?`;
    await dbRun(sql, [name, email, userId]);

    // Busca os dados atualizados para retornar na resposta
    const updatedUser = await dbGet(
      `SELECT id, name, email, userType FROM ${tableName} WHERE id = ?`,
      [userId]
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("[ERROR] updateProfile:", error);
    res.status(500).json({
      message: "Ocorreu um erro interno ao atualizar o perfil.",
      error: error.message,
    });
  }
};
