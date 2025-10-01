const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middlewares/auth");

// --- ROTAS DE REGISTRO  ---
router.post("/register/client", authController.registerClient);
router.post("/register/provider", authController.registerProvider);

// --- ROTA DE LOGIN UNIFICADA  ---
router.post("/login", authController.login);

// --- ROTA PROTEGIDA PARA ATUALIZAÇÃO DE PERFIL ---
router.put("/profile", verifyToken, authController.updateProfile);

module.exports = router;
