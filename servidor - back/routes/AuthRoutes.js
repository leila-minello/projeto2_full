const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/AuthController');
const router = express.Router();

router.post('/register', [
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('E-mail inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
], authController.registerUser);

router.post('/login', [
  body('email').isEmail().withMessage('E-mail inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória'),
], authController.loginUser);

module.exports = router;
