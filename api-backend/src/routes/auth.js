const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const { verifyToken } = require("../middlewares/auth");

// --- ROTAS PARA CLIENTES ---
router.post("/register/client", authController.registerClient); // Rota pública
router.post("/login/client", authController.loginClient); // Rota pública

// --- ROTAS PARA PRESTADORES (PROVIDERS) ---
router.post("/register/provider", authController.registerProvider); // Rota pública
router.post("/login/provider", authController.loginProvider); // Rota pública

// --- ROTA PROTEGIDA PARA USUÁRIO LOGADO ---
// Só requisições com um token válido passarão por ele e chegarão ao controller.
router.put("/profile", verifyToken, authController.updateProfile);

module.exports = router;
