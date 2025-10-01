require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const { initDb } = require("../database.js");

const authRoutes = require("./routes/auth.js");
const adRoutes = require("./routes/adRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --- Definição das Rotas ---

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
app.use("/api-backend/users", userRoutes);

// --- Inicialização do Servidor ---
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initDb();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Acesse a documentação em: http://localhost:${PORT}/docs`);
    });
  } catch (error) {
    console.error("Falha ao inicializar o banco de dados:", error);
    process.exit(1);
  }
};

startServer();
