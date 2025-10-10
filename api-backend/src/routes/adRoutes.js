const express = require("express");
const router = express.Router();

const adController = require("../controllers/adController");
const { verifyToken, checkRole } = require("../middlewares/auth");
const upload = require("../config/upload");

// --- ROTAS PÚBLICAS ---
router.get("/", adController.getAllAds);
router.get("/:id", adController.getAdById);

// --- ROTAS PROTEGIDAS PARA PROVIDERS ---

// Rota para o provider logado buscar apenas os seus anúncios
router.get(
  "/provider/my-ads",
  verifyToken,
  checkRole(["provider"]),
  adController.getProviderAds
);

// Rota para criar um novo anúncio
router.post(
  "/",
  verifyToken,
  checkRole(["provider"]),
  upload.single("image"),
  adController.createAd
);

// Rota para atualizar um anúncio existente
router.put(
  "/:id",
  verifyToken,
  checkRole(["provider"]),
  upload.single("image"), 
  adController.updateAd
);

// Rota para deletar um anúncio
router.delete(
  "/:id",
  verifyToken,
  checkRole(["provider"]),
  adController.deleteAd
);

module.exports = router;
