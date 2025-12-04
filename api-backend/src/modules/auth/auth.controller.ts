import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../../config/database'; 

import { 
  IRegisterClientDTO, 
  IRegisterProviderDTO, 
  ILoginDTO, 
  IUpdateProfileDTO, 
  IRegisterAdminDTO, 
  IDbUser, 
  AuthRequest 
} from './auth.interface';

const JWT_SECRET = process.env.JWT_SECRET || "";


const dbGet = <T>(sql: string, params: any[]): Promise<T | undefined> => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err: Error | null, row: T) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbRun = (sql: string, params: any[]): Promise<{ lastID: number; changes: number }> => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (this: any, err: Error | null) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

const generateToken = (id: number, email: string, role: string) => {
  return jwt.sign({ id, email, role }, JWT_SECRET, { expiresIn: "24h" });
};

// ============================================
// REGISTRAR CLIENTE
// ============================================
export const registerClient = async (req: Request<{}, {}, IRegisterClientDTO>, res: Response) => {
  const {
    name, cpf, email, password, phone, cep, logradouro, numero, 
    complemento, bairro, cidade, uf, comoFicouSabendo,
  } = req.body;

  if (!name || !cpf || !email || !password || !phone) {
    return res.status(400).json({
      message: "Nome, CPF, email, senha e telefone são obrigatórios.",
    });
  }

  try {
    const existingClient = await dbGet<{ ID: number }>(
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
      name, cpf, email, hashedPassword, phone, cep || null, logradouro || null, 
      numero || null, complemento || null, bairro || null, cidade || null, 
      uf || null, comoFicouSabendo || null, "CLIENTE",
    ];
    
    const result = await dbRun(sql, params);
    const newUserId = result.lastID;

    const token = generateToken(newUserId, email, "CLIENTE");
    
    return res.status(201).json({
      message: "Cliente criado com sucesso!",
      user: { id: newUserId, name, email, role: "CLIENTE" },
      token,
    });
  } catch (error) {
    console.error("[ERROR] registerClient:", error);
    return res.status(500).json({
      message: "Erro no servidor ao registrar cliente.",
      error: (error as Error).message,
    });
  }
};

// ============================================
// REGISTRAR PRESTADOR
// ============================================
export const registerProvider = async (req: Request<{}, {}, IRegisterProviderDTO>, res: Response) => {
  const {
    razaoSocial, nomeFantasia, cnpj, inscricaoEstadual, email, password, phone,
    cep, logradouro, numero, complemento, bairro, cidade, uf,
    descricaoEmpresa, logo, comoFicouSabendo,
  } = req.body;

  if (!razaoSocial || !nomeFantasia || !cnpj || !email || !password || !phone) {
    return res.status(400).json({
      message: "Razão Social, Nome Fantasia, CNPJ, email, senha e telefone são obrigatórios.",
    });
  }

  try {
    const existingPrestador = await dbGet<{ ID: number }>(
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
      razaoSocial, nomeFantasia, cnpj, inscricaoEstadual || null, email, hashedPassword,
      phone, cep || null, logradouro || null, numero || null, complemento || null,
      bairro || null, cidade || null, uf || null, descricaoEmpresa || null,
      logo || null, comoFicouSabendo || null, "PRESTADOR",
    ];

    const result = await dbRun(sql, params);
    const newUserId = result.lastID;

    const token = generateToken(newUserId, email, "PRESTADOR");
    
    return res.status(201).json({
      message: "Prestador criado com sucesso!",
      user: { id: newUserId, nomeFantasia, email, role: "PRESTADOR" },
      token,
    });
  } catch (error) {
    console.error("[ERROR] registerProvider:", error);
    return res.status(500).json({
      message: "Erro no servidor ao registrar prestador.",
      error: (error as Error).message,
    });
  }
};

// ============================================
// LOGIN
// ============================================
export const login = async (req: Request<{}, {}, ILoginDTO>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha email e senha." });
  }

  try {
    let user: IDbUser | undefined;
    let userName: string | undefined;

    user = await dbGet<IDbUser>("SELECT * FROM CLIENTES WHERE EMAIL = ?", [email]);
    if (user) {
      userName = user.NOME; 
    }

    if (!user) {
      user = await dbGet<IDbUser>("SELECT * FROM PRESTADORES WHERE EMAIL = ?", [email]);
      if (user) {
        userName = user.NOME_FANTASIA;
      }
    }

    if (!user) {
      user = await dbGet<IDbUser>("SELECT * FROM ADMINS WHERE EMAIL = ?", [email]);
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
    
    return res.status(200).json({
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
    return res.status(500).json({
      message: "Erro no servidor durante o login.",
      error: (error as Error).message,
    });
  }
};

// ============================================
// ATUALIZAR PERFIL
// ============================================
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
        return res.status(401).json({ message: "Usuário não autenticado." });
    }

    const { id: userId, role } = req.user;
    
    const { name, email } = req.body as IUpdateProfileDTO;

    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Nome e e-mail são obrigatórios." });
    }

    let tableName: string;
    let nameColumn: string;

    if (role === "CLIENTE") {
      tableName = "CLIENTES";
      nameColumn = "NOME";
    } else if (role === "PRESTADOR") {
      tableName = "PRESTADORES";
      nameColumn = "NOME_FANTASIA";
    } else {
      return res.status(400).json({ message: "Tipo de usuário inválido." });
    }

    const existingUser = await dbGet<{ ID: number }>(
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

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("[ERROR] updateProfile:", error);
    return res.status(500).json({
      message: "Ocorreu um erro interno ao atualizar o perfil.",
      error: (error as Error).message,
    });
  }
};

// ============================================
// REGISTRAR ADMIN (só outro admin pode criar)
// ============================================
export const registerAdmin = async (req: Request<{}, {}, IRegisterAdminDTO>, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Nome, email e senha são obrigatórios.",
    });
  }

  try {
    const existingAdmin = await dbGet<{ ID: number }>("SELECT ID FROM ADMINS WHERE EMAIL = ?", [
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
    
    return res.status(201).json({
      message: "Admin criado com sucesso!",
      user: { id: newUserId, name, email, role: "ADMIN" },
      token,
    });
  } catch (error) {
    console.error("[ERROR] registerAdmin:", error);
    return res.status(500).json({
      message: "Erro no servidor ao registrar admin.",
      error: (error as Error).message,
    });
  }
};

// ============================================
// LOGIN ADMIN
// ============================================
export const loginAdmin = async (req: Request<{}, {}, ILoginDTO>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  try {
    const admin = await dbGet<IDbUser>("SELECT * FROM ADMINS WHERE EMAIL = ?", [email]);

    if (!admin) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const isMatch = await bcrypt.compare(password, admin.SENHA);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const token = generateToken(admin.ID, admin.EMAIL, admin.ROLE);
    
    return res.status(200).json({
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
    return res.status(500).json({
      message: "Erro no servidor durante o login.",
      error: (error as Error).message,
    });
  }
};