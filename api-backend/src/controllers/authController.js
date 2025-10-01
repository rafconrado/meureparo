const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../../database.js");

const JWT_SECRET = process.env.JWT_SECRET || "seu_segredo_padrao_para_testes";

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
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, JWT_SECRET, { expiresIn: "24h" });
};

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

  if (!name || !cpf || !email || !password || !phone) {
    return res.status(400).json({
      message: "Nome, CPF, email, senha e telefone são obrigatórios.",
    });
  }

  try {
    const existingClient = await dbGet(
      "SELECT id FROM clients WHERE email = ? OR cpf = ?",
      [email, cpf]
    );
    if (existingClient) {
      return res.status(409).json({ message: "Email ou CPF já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO clients (name, cpf, email, password, phone, cep, logradouro, numero, complemento, bairro, cidade, uf, comoFicouSabendo, role)
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
      comoFicouSabendo || null,
      "client",
    ];
    const result = await dbRun(sql, params);
    const newUserId = result.lastID;

    const token = generateToken(newUserId, email, "client");
    res.status(201).json({
      message: "Cliente criado com sucesso!",
      user: { id: newUserId, name, email, role: "client" },
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
    const existingProvider = await dbGet(
      "SELECT id FROM providers WHERE email = ? OR cnpj = ?",
      [email, cnpj]
    );
    if (existingProvider) {
      return res.status(409).json({ message: "Email ou CNPJ já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO providers (name, cnpj, email, password, phone, cep, logradouro, numero, complemento, bairro, cidade, uf, servico, role)
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

    const token = generateToken(newUserId, email, "provider");
    res.status(201).json({
      message: "Prestador criado com sucesso!",
      user: { id: newUserId, name, email, role: "provider" },
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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha email e senha." });
  }

  try {
    let user = null;

    user = await dbGet("SELECT * FROM admins WHERE email = ?", [email]);
    if (!user) {
      user = await dbGet("SELECT * FROM providers WHERE email = ?", [email]);
    }
    if (!user) {
      user = await dbGet("SELECT * FROM clients WHERE email = ?", [email]);
    }

    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const token = generateToken(user.id, user.email, user.role);
    res.status(200).json({
      message: "Login bem-sucedido!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("[ERROR] login:", error);
    res.status(500).json({
      message: "Erro no servidor durante o login.",
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id: userId, role } = req.user;
    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Nome e e-mail são obrigatórios." });
    }

    let tableName;
    if (role === "client") {
      tableName = "clients";
    } else if (role === "provider") {
      tableName = "providers";
    } else if (role === "admin") {
      tableName = "admins";
    } else {
      return res.status(400).json({ message: "Tipo de usuário inválido." });
    }

    const existingUser = await dbGet(
      `SELECT id FROM ${tableName} WHERE email = ? AND id != ?`,
      [email, userId]
    );
    if (existingUser) {
      return res.status(409).json({ message: "Este e-mail já está em uso." });
    }

    const sql = `UPDATE ${tableName} SET name = ?, email = ? WHERE id = ?`;
    await dbRun(sql, [name, email, userId]);

    const updatedUser = await dbGet(
      `SELECT id, name, email, role FROM ${tableName} WHERE id = ?`,
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
