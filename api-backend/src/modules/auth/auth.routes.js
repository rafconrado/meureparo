const express = require("express");
const router = express.Router();
const authController = require("./authController");
const { verifyToken } = require("../../shared/middlewares/auth");

// --- ROTAS DE REGISTRO  ---
router.post("/register/client", authController.registerClient);
router.post("/register/provider", authController.registerProvider);

// --- ROTA DE LOGIN  ---
router.post("/login", authController.login);
router.post("/login/admin", authController.loginAdmin);

// --- ROTA PROTEGIDA PARA ATUALIZAÇÃO DE PERFIL ---
router.put("/profile", verifyToken, authController.updateProfile);

module.exports = router;
