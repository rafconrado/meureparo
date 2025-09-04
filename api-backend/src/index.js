require("dotenv").config();

const express = require("express");
const cors = require("cors");
require("./../database.js"); 

// Importar as rotas
const authRoutes = require("./routes/auth.js");
const adRoutes = require("./routes/adRoutes.js"); 

const app = express();

app.use(cors());
app.use(express.json());

// Usar as rotas com um prefixo padrão para a API
app.use("/api-backend/auth", authRoutes);
app.use("/api-backend/ads", adRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
