const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken, checkRole } = require("../middlewares/auth");

router.get(
  "/",
  verifyToken,
  checkRole(["admin", "superadmin"]),
  userController.getAllUsers
);

module.exports = router;