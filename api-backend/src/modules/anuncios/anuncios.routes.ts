import { Router } from 'express';
import * as adController from './anuncios.controller';
import { verifyToken, checkRole } from '../../shared/middlewares/auth';
import { upload } from '../../config/upload';

const router = Router();

// --- ROTAS PÚBLICAS ---
router.get("/", adController.getAllAds);
router.get("/:id", adController.getAdById);

// --- ROTAS PROTEGIDAS PARA PRESTADORES ---

router.get(
  "/provider/my-ads",
  verifyToken,
  checkRole(["PRESTADOR"]), 
  adController.getProviderAds
);

router.post(
  "/",
  verifyToken,
  checkRole(["PRESTADOR"]),
  upload.single("image"),
  adController.createAd
);

router.put(
  "/:id",
  verifyToken,
  checkRole(["PRESTADOR"]),
  upload.single("image"),
  adController.updateAd
);

// Rota para deletar um anúncio
router.delete(
  "/:id",
  verifyToken,
  checkRole(["PRESTADOR"]),
  adController.deleteAd
);

export default router;