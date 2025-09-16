const express = require("express");
const router = express.Router();
const adController = require("../controllers/adController");

const { verifyToken } = require("../middlewares/auth");

// --- ROTAS PÚBLICAS (acessíveis por todos, incluindo clientes) ---

//Rota para listar todos os anúncios
router.get("/", adController.getAllAds);

//Rota para ver um anúncio específico
router.get("/:id", adController.getAdById);

// --- ROTAS PROTEGIDAS (acessíveis apenas por prestadores autenticados) ---

//Rota para criar um novo anúncio
router.post("/", verifyToken, adController.createAd);

//Rota para atualizar um anúncio existente
router.put("/:id", verifyToken, adController.updateAd);

//Rota para deletar um anúncio
router.delete("/:id", verifyToken, adController.deleteAd);

module.exports = router;
