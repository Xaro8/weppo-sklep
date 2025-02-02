const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { isAuthenticated } = require('../middlewares/auth.middleware');

router.get('/user/delete', isAuthenticated, userController.deleteUser);
router.get('/user', isAuthenticated, userController.getUser);
router.post('/checkout', isAuthenticated, userController.makeOrder);

module.exports = router;