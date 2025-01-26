const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.get('/product/:id', productController.getProduct);
router.get('/products', productController.getProducts);

module.exports = router;