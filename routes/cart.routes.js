const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');

const { isAuthenticated } = require('../middlewares/auth.middleware');

router.post('/addToCart/:id', isAuthenticated, cartController.addProductToCart);
router.post('/removeFromCart/:id', isAuthenticated, cartController.removeProductFromCart);

module.exports = router;