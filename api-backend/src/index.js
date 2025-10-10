require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const { initDb } = require("../database.js");

const authRoutes = require("./routes/auth.js");
const adRoutes = require("./routes/adRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");

const app = express();

// ============================================
// MIDDLEWARES
// ============================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos (CSS, JS, etc)
app.use(express.static(path.join(__dirname, "public")));

// Serve arquivos de upload (imagens)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// ============================================
// CRIAR PASTA DE UPLOADS SE NÃO EXISTIR
// ============================================
const uploadsDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Pasta /public/uploads criada");
}

// ============================================
// ROTAS PÚBLICAS
// ============================================

app.get("/", (req, res) => {
  res.status(200).send(`
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
      <h1 style="color: #2c3e50;">🚀 API Find & Fix</h1>
      <p style="font-size: 1.2em; color: #3498db;">O servidor está no ar e funcionando!</p>
      <p>Acesse a <a href="/docs" style="color: #2980b9; text-decoration: none;">documentação da API</a> para ver os endpoints.</p>
      <hr style="margin: 30px 0;">
      <p style="color: #555;">
        <strong>Status do Upload de Imagens:</strong> ✅ Ativo<br>
        <em>Endpoint: /uploads/seu-arquivo.jpg</em>
      </p>
    </div>
  `);
});

app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "documentacao.html"));
});

// ============================================
// ROTAS DA API COM PREFIXO
// ============================================

app.use("/api-backend/auth", authRoutes);
app.use("/api-backend/ads", adRoutes);
app.use("/api-backend/users", userRoutes);
app.use("/api-backend/categories", categoryRoutes);

// ============================================
// MIDDLEWARE DE ERRO GLOBAL
// ============================================

app.use((err, req, res, next) => {
  console.error("❌ Erro global:", err);

  // Erros de multer
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Arquivo muito grande. Máximo 5MB",
        error: err.message,
      });
    }
    return res.status(400).json({
      message: "Erro no upload",
      error: err.message,
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Erro interno do servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ============================================
// ROTA 404
// ============================================

app.use((req, res) => {
  res.status(404).json({
    message: "Rota não encontrada",
    path: req.path,
  });
});

// ============================================
// INICIALIZAÇÃO DO SERVIDOR
// ============================================

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initDb();

    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando na porta ${PORT}`);
      console.log(
        `📁 Uploads disponíveis em: http://localhost:${PORT}/uploads`
      );
    });
  } catch (error) {
    console.error("❌ Falha ao inicializar o banco de dados:", error);
    process.exit(1);
  }
};

startServer();
