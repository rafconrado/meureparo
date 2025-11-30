const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../../config/database.js");

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "014c3590972dffd7a5215185d301cab5c39db03a4daef41e2561b82cea6e30d8";

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

// ============================================
// REGISTRAR CLIENTE
// ============================================
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
      "SELECT ID FROM CLIENTES WHERE EMAIL = ? OR CPF = ?",
      [email, cpf]
    );
    if (existingClient) {
      return res.status(409).json({ message: "Email ou CPF já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO CLIENTES (NOME, CPF, EMAIL, SENHA, TELEFONE, CEP, LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO, CIDADE, UF, COMO_FICOU_SABENDO, ROLE)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      name,
      cpf,
      email,
      hashedPassword,
      phone,
      cep || null,
      logradouro || null,
      numero || null,
      complemento || null,
      bairro || null,
      cidade || null,
      uf || null,
      comoFicouSabendo || null,
      "CLIENTE",
    ];
    const result = await dbRun(sql, params);
    const newUserId = result.lastID;

    const token = generateToken(newUserId, email, "CLIENTE");
    res.status(201).json({
      message: "Cliente criado com sucesso!",
      user: { id: newUserId, name, email, role: "CLIENTE" },
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

// ============================================
// REGISTRAR PRESTADOR
// ============================================
exports.registerProvider = async (req, res) => {
  const {
    razaoSocial,
    nomeFantasia,
    cnpj,
    inscricaoEstadual,
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
    descricaoEmpresa,
    logo,
    comoFicouSabendo,
  } = req.body;

  if (!razaoSocial || !nomeFantasia || !cnpj || !email || !password || !phone) {
    return res.status(400).json({
      message:
        "Razão Social, Nome Fantasia, CNPJ, email, senha e telefone são obrigatórios.",
    });
  }

  try {
    const existingPrestador = await dbGet(
      "SELECT ID FROM PRESTADORES WHERE EMAIL = ? OR CNPJ = ?",
      [email, cnpj]
    );
    if (existingPrestador) {
      return res.status(409).json({ message: "Email ou CNPJ já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO PRESTADORES (RAZAO_SOCIAL, NOME_FANTASIA, CNPJ, INSCRICAO_ESTADUAL, EMAIL, SENHA, TELEFONE, CEP, LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO, CIDADE, UF, DESCRICAO_EMPRESA, LOGO, COMO_FICOU_SABENDO, ROLE)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      razaoSocial,
      nomeFantasia,
      cnpj,
      inscricaoEstadual || null,
      email,
      hashedPassword,
      phone,
      cep || null,
      logradouro || null,
      numero || null,
      complemento || null,
      bairro || null,
      cidade || null,
      uf || null,
      descricaoEmpresa || null,
      logo || null,
      comoFicouSabendo || null,
      "PRESTADOR",
    ];
    const result = await dbRun(sql, params);
    const newUserId = result.lastID;

    const token = generateToken(newUserId, email, "PRESTADOR");
    res.status(201).json({
      message: "Prestador criado com sucesso!",
      user: { id: newUserId, nomeFantasia, email, role: "PRESTADOR" },
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

// ============================================
// LOGIN
// ============================================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha email e senha." });
  }

  try {
    let user = null;
    let userName = null;

    // Busca em CLIENTES
    user = await dbGet("SELECT * FROM CLIENTES WHERE EMAIL = ?", [email]);
    if (user) {
      userName = user.NOME;
    }

    // Busca em PRESTADORES
    if (!user) {
      user = await dbGet("SELECT * FROM PRESTADORES WHERE EMAIL = ?", [email]);
      if (user) {
        userName = user.NOME_FANTASIA;
      }
    }

    if (!user) {
      user = await dbGet("SELECT * FROM ADMINS WHERE EMAIL = ?", [email]);
      if (user) userName = user.NOME;
    }

    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const isMatch = await bcrypt.compare(password, user.SENHA);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    const token = generateToken(user.ID, user.EMAIL, user.ROLE);
    res.status(200).json({
      message: "Login bem-sucedido!",
      user: {
        id: user.ID,
        name: userName,
        email: user.EMAIL,
        role: user.ROLE,
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

// ============================================
// ATUALIZAR PERFIL
// ============================================
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
    let nameColumn;

    if (role === "CLIENTE") {
      tableName = "CLIENTES";
      nameColumn = "NOME";
    } else if (role === "PRESTADOR") {
      tableName = "PRESTADORES";
      nameColumn = "NOME_FANTASIA";
    } else {
      return res.status(400).json({ message: "Tipo de usuário inválido." });
    }

    const existingUser = await dbGet(
      `SELECT ID FROM ${tableName} WHERE EMAIL = ? AND ID != ?`,
      [email, userId]
    );
    if (existingUser) {
      return res.status(409).json({ message: "Este e-mail já está em uso." });
    }

    const sql = `UPDATE ${tableName} SET ${nameColumn} = ?, EMAIL = ? WHERE ID = ?`;
    await dbRun(sql, [name, email, userId]);

    const updatedUser = await dbGet(
      `SELECT ID, ${nameColumn} as name, EMAIL, ROLE FROM ${tableName} WHERE ID = ?`,
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

// ============================================
// REGISTRAR ADMIN (só outro admin pode criar)
// ============================================
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Nome, email e senha são obrigatórios.",
    });
  }

  try {
    // Verifica se já existe
    const existingAdmin = await dbGet("SELECT ID FROM ADMINS WHERE EMAIL = ?", [
      email,
    ]);
    if (existingAdmin) {
      return res.status(409).json({ message: "Email já cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO ADMINS (NOME, EMAIL, SENHA, ROLE)
      VALUES (?, ?, ?, ?)
    `;
    const params = [name, email, hashedPassword, "ADMIN"];
    const result = await dbRun(sql, params);
    const newUserId = result.lastID;

    const token = generateToken(newUserId, email, "ADMIN");
    res.status(201).json({
      message: "Admin criado com sucesso!",
      user: { id: newUserId, name, email, role: "ADMIN" },
      token,
    });
  } catch (error) {
    console.error("[ERROR] registerAdmin:", error);
    res.status(500).json({
      message: "Erro no servidor ao registrar admin.",
      error: error.message,
    });
  }
};

// ============================================
// LOGIN ADMIN
// ============================================
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    const admin = await dbGet("SELECT * FROM ADMINS WHERE EMAIL = ?", [email]);

    if (!admin) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const isMatch = await bcrypt.compare(password, admin.SENHA);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const token = generateToken(admin.ID, admin.EMAIL, admin.ROLE);
    res.status(200).json({
      message: "Login de admin bem-sucedido!",
      user: {
        id: admin.ID,
        name: admin.NOME,
        email: admin.EMAIL,
        role: admin.ROLE,
      },
      token,
    });
  } catch (error) {
    console.error("[ERROR] loginAdmin:", error);
    res.status(500).json({
      message: "Erro no servidor durante o login.",
      error: error.message,
    });
  }
};
