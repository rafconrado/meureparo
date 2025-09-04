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
  const { email, password } = req.body;

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
