const express = require("express");
const authController = require("../controllers/AuthController");
const authMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
