const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "sua_chave_secreta_aqui";

router.post("/register", async (req, res) => {
  const {
    name,
    cpf,
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
    comoFicouSabendo,
    userType // "client" ou "provider"
  } = req.body;

  if (!name || !email || !password || !phone || !cep || !logradouro || !numero || !bairro || !cidade || !uf || !userType) {
    return res.status(400).json({ message: "Preencha todos os campos obrigatórios" });
  }

  const table = userType === "provider" ? "providers" : "clients";

  // Verificação de documento obrigatória por tipo
  if (userType === "client" && !cpf) {
    return res.status(400).json({ message: "CPF é obrigatório para clientes" });
  }
  if (userType === "provider" && !cnpj) {
    return res.status(400).json({ message: "CNPJ é obrigatório para prestadores" });
  }

  try {
    db.get(
      `SELECT * FROM ${table} WHERE email = ? OR ${userType === "provider" ? "cnpj" : "cpf"} = ?`,
      [email, userType === "provider" ? cnpj : cpf],
      async (err, user) => {
        if (err) return res.status(500).json({ message: err.message });
        if (user) return res.status(400).json({ message: "Usuário já existe" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
          INSERT INTO ${table} (
            name, ${userType === "provider" ? "cnpj" : "cpf"},
            email, password, phone, cep, logradouro, numero,
            complemento, bairro, cidade, uf, comoFicouSabendo, userType
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
          name,
          userType === "provider" ? cnpj : cpf,
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
          userType
        ];

        db.run(sql, params, function (err) {
          if (err) {
            return res.status(500).json({ message: "Erro ao criar usuário" });
          }

          const token = jwt.sign(
            { id: this.lastID, email, userType },
            JWT_SECRET,
            { expiresIn: "1d" }
          );

          res.json({
            id: this.lastID,
            name,
            email,
            userType,
            token
          });
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha email e senha" });
  }

  // Primeiro, verificar se é client ou provider
  const checkTable = (table) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM ${table} WHERE email = ?`, [email], (err, user) => {
        if (err) reject(err);
        else resolve(user);
      });
    });
  };

  (async () => {
    try {
      let user = await checkTable("clients");
      if (!user) user = await checkTable("providers");
      if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

      const bcrypt = require("bcryptjs");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Senha incorreta" });

      const jwt = require("jsonwebtoken");
      const token = jwt.sign(
        { id: user.id, email: user.email, userType: user.userType },
        "sua_chave_secreta_aqui",
        { expiresIn: "1d" }
      );

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        token
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao logar", error: error.message });
    }
  })();
});

module.exports = router;
