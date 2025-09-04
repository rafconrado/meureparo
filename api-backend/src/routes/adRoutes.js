const express = require("express");
const router = express.Router();
const adController = require("../controllers/adController.js");
const authMiddleware = require("../middlewares/auth.js"); // Precisaremos de um middleware

// Rota para LISTAR todos os anúncios (Pública)
router.get("/", adController.getAllAds);

// Rota para CRIAR um novo anúncio (Protegida)


// O middleware 'verifyToken' vai garantir que o usuário está logado
router.post("/", authMiddleware.verifyToken, adController.createAd);

module.exports = router;
