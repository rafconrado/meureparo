const express = require("express");
const router = express.Router();
const adController = require("../controllers/adController");

// Agora importamos também o checkRole para verificar a permissão
const { verifyToken, checkRole } = require("../middlewares/auth");

// --- ROTAS PÚBLICAS (acessíveis por todos, incluindo clientes) ---
// (Nenhuma alteração aqui)

// Rota para listar todos os anúncios
router.get("/", adController.getAllAds);

// Rota para ver um anúncio específico
router.get("/:id", adController.getAdById);

// --- ROTAS PROTEGIDAS ---

// Rota para criar um novo anúncio
// Acessível apenas para usuários logados com o cargo 'provider'
router.post("/", verifyToken, checkRole(["provider"]), adController.createAd);

// Rota para atualizar um anúncio existente
// Acessível apenas para usuários logados com o cargo 'provider'
router.put("/:id", verifyToken, checkRole(["provider"]), adController.updateAd);

// Rota para deletar um anúncio
// Acessível apenas para usuários logados com o cargo 'provider'
router.delete(
  "/:id",
  verifyToken,
  checkRole(["provider"]),
  adController.deleteAd
);

module.exports = router;
