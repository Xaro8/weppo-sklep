const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { isAuthenticated } = require('../middlewares/auth.middleware');

router.get('/login', (req, res) => { 
  res.render('login'); 
});

router.get('/register', (req, res) => { 
  res.render('register'); 
});

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
router.post('/logout', isAuthenticated, authController.logoutUser);

module.exports = router;