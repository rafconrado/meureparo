const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const { verifyToken, checkRole } = require("../middlewares/auth");

// Rota pública para listar todas as categorias
router.get("/", categoryController.getAllCategories);

// Rota protegida para criar uma nova categoria (acessível apenas por admin, por exemplo)
router.post(
  "/",
  verifyToken,
  checkRole(["ADMIN"]),
  categoryController.createCategory
);

module.exports = router;
