import { Router } from 'express';
import * as userController from './usuarios.controller';
import { verifyToken, checkRole } from '../../shared/middlewares/auth';

const router = Router();

router.get(
  "/",
  verifyToken,
  checkRole(["ADMIN"]), 
  userController.getAllUsers
);

export default router;