const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "sua_chave_secreta_aqui";

router.post("/register", async (req, res) => {
  const { name, email, password, userType } = req.body;

  if (!name || !email || !password || !userType) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql =
    "INSERT INTO users (name, email, password, userType) VALUES (?, ?, ?, ?)";
  const params = [name, email, hashedPassword, userType];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(400).json({ message: "Email já está em uso" });
    }
    res.json({ id: this.lastID, name, email, userType });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  const params = [email];

  db.get(sql, params, async (err, user) => {
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
