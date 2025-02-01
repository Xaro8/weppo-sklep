const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');

const { isAuthenticated } = require('../middlewares/auth.middleware');

router.post('/addToCart/:id', isAuthenticated, cartController.addProductToCart);
router.get('/addToCart/:id', isAuthenticated, cartController.addProductToCart);
router.post('/cart/remove/:id', isAuthenticated, cartController.removeProductFromCart);
/*
router.get('/cart', isAuthenticated, (req, res) => {
    const cart = {
        items: [
            { name: 'Item X', price: 10.5, quantity: 2 },
            { name: 'Item Y', price: 5.0, quantity: 3 },
        ],
        total: 35.5,
    };
    res.render('cart', { cart });
});
*/
router.get('/cart', isAuthenticated, cartController.getCart);
router.post('/cart/update/:id', isAuthenticated, cartController.updateCart);

module.exports = router;