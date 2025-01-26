const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');

router.get('/login', (req, res) => { 
  res.render('login'); 
});

router.get('/register', (req, res) => { 
  res.render('register'); 
});

router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.render('admin');
});

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
router.post('/logout', authController.logoutUser);

module.exports = router;