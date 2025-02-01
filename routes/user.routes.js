const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { isAuthenticated } = require('../middlewares/auth.middleware');

/*
router.get('/user', isAuthenticated, async (req, res) => {
    const id = req.signedCookies.userId;

    const username = await getUsername(id);

    const orders = [
        { id: '12345', date: '2025-01-28', total: 100, items: [{ name: 'Item A', quantity: 1 }, { name: 'Item B', quantity: 2 }] },
        { id: '67890', date: '2025-01-15', total: 50, items: [{ name: 'Item C', quantity: 1 }] },
    ];

    res.render('user', { id, username, orders });
});


router.get('/user/delete', isAuthenticated, async (req, res) => {
    const id = req.signedCookies.userId;
    removeUser(id);
    res.clearCookie('userId');
	res.redirect('/');
});
*/
router.get('/user/delete', isAuthenticated, userController.deleteUser);
router.get('/user', isAuthenticated, userController.getUser);

module.exports = router;