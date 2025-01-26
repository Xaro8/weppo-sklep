const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.loginUser);

router.post('/register', authController.registerUser);

router.post('/logout', authController.logoutUser);

module.exports = router;