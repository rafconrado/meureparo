require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

require("../database.js");

//Importação das rotas
const authRoutes = require("./routes/auth.js");
const adRoutes = require("./routes/adRoutes.js");

//Inicialização do Express
const app = express();

//Configuração dos Middlewares
app.use(cors());

app.use(express.json());

// Middleware para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, "public")));

// --- Definição das Rotas ---

// Rotas públicas (documentação, etc.)
app.get("/", (req, res) => {
  res.status(200).send(`
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
      <h1 style="color: #2c3e50;">🚀 API Find & Fix</h1>
      <p style="font-size: 1.2em; color: #3498db;">O servidor está no ar e funcionando!</p>
      <p>Acesse a <a href="/docs" style="color: #2980b9; text-decoration: none;">documentação da API</a> para ver os endpoints.</p>
    </div>
  `);
});

app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "documentacao.html"));
});

// Rotas da API com prefixo
app.use("/api-backend/auth", authRoutes);
app.use("/api-backend/ads", adRoutes);

// --- Inicialização do Servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse a documentação em: http://localhost:${PORT}/docs`);
});
