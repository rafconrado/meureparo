require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// --- Conexão com o Banco de Dados ---
require("./../database.js");
// --- Importação das Rotas da API ---
const authRoutes = require("./routes/auth.js");
const adRoutes = require("./routes/adRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());

// --- Servir Arquivos Estáticos ---
// Configura o Express para servir qualquer arquivo encontrado na pasta 'public'
app.use(express.static(path.join(__dirname, "public")));

// --- Rotas Públicas (Home e Documentação) ---

app.get("/", (req, res) => {
  res.status(200).send(`
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
      <h1 style="color: #2c3e50;">🚀 API Find & Fix</h1>
      <p style="font-size: 1.2em; color: #3498db;">O servidor está no ar e funcionando!</p>
      <p>Acesse a <a href="/docs" style="color: #2980b9; text-decoration: none;">documentação da API</a> para ver os endpoints.</p>
    </div>
  `);
});

// Rota para a Documentação da API
// Quando alguém acessar /docs, o servidor enviará o arquivo HTML que está na pasta public
app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "documentacao.html"));
});

// --- Rotas da API (Com prefixo) ---
// Todas as suas rotas de lógica de negócio vêm aqui
app.use("/api-backend/auth", authRoutes);
app.use("/api-backend/ads", adRoutes);

// --- Inicialização do Servidor ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse a documentação em: http://localhost:${PORT}/docs`);
});
