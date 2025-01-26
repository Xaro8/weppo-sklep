const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');

router.post('/addToCart', cartController.addProductToCart);
router.post('/removeFromCart', cartController.removeProductFromCart);

module.exports = router;