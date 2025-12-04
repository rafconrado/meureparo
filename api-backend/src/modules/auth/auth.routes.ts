import { Router } from 'express';
import * as authController from './auth.controller';
import { verifyToken } from '../../shared/middlewares/auth';

const router = Router();

// --- ROTAS DE REGISTRO ---
router.post("/register/client", authController.registerClient);
router.post("/register/provider", authController.registerProvider);

// --- ROTA DE LOGIN ---
router.post("/login", authController.login);
router.post("/login/admin", authController.loginAdmin);

// --- ROTA PROTEGIDA PARA ATUALIZAÇÃO DE PERFIL ---
router.put("/profile", verifyToken, authController.updateProfile);

export default router;