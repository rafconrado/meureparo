import { Router } from 'express';
import * as categoryController from '../categorias/categorias.controller';
import { verifyToken, checkRole } from '../../shared/middlewares/auth';

const router = Router();

// Rota pública para listar todas as categorias
router.get("/", categoryController.getAllCategories);

// Rota protegida para criar uma nova categoria
router.post(
  "/",
  verifyToken,
  checkRole(["ADMIN"]),
  categoryController.createCategory
);

export default router;