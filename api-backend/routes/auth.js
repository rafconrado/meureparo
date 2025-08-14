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
    userType,
  } = req.body;

  if (
    !name ||
    !cpf ||
    !email ||
    !password ||
    !phone ||
    !cep ||
    !logradouro ||
    !numero ||
    !bairro ||
    !cidade ||
    !uf ||
    !comoFicouSabendo ||
    !userType
  ) {
    return res
      .status(400)
      .json({ message: "Preencha todos os campos obrigatórios" });
  }

  try {
    db.get(
      "SELECT * FROM users WHERE email = ? OR cpf = ?",
      [email, cpf],
      async (err, user) => {
        if (err) return res.status(500).json({ message: err.message });
        if (user) return res.status(400).json({ message: "Usuário já existe" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
        INSERT INTO users (
          name, cpf, email, password, phone, cep, logradouro, numero,
          complemento, bairro, cidade, uf, comoFicouSabendo, userType
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
          comoFicouSabendo,
          userType,
        ];

        db.run(sql, params, function (err) {
          if (err)
            return res.status(500).json({ message: "Erro ao criar usuário" });

          const token = jwt.sign(
            { id: this.lastID, email, userType },
            JWT_SECRET,
            { expiresIn: "1d" }
          );

          res.json({
            id: this.lastID,
            name,
            email,
            token,
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

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!user)
      return res.status(400).json({ message: "Usuário não encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Senha incorreta" });

    const token = jwt.sign(
      { id: user.id, email: user.email, userType: user.userType },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
      token,
    });
  });
});

module.exports = router;
