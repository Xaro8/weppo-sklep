const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.get('/product/:id', productController.addProduct);
router.get('/products', productController.getProducts);

module.exports = router;