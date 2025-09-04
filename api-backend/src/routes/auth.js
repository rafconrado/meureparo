const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// --- ROTAS PARA CLIENTES ---

// Rota para registrar um novo cliente
router.post("/client/register", authController.registerClient);

// Rota para login de um cliente
router.post("/client/login", authController.loginClient);

// --- ROTAS PARA PRESTADORES (PROVIDERS) ---

// Rota para registrar um novo prestador
router.post("/register/provider", authController.registerProvider);

// Rota para login de um prestador
router.post("/login/provider", authController.loginProvider);

module.exports = router;
