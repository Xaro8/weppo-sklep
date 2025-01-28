const express = require('express');
const User = require('../models/User');

const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth.middleware');

async function getUsername(id) {
    try {
        const user = await User.findOne({ where: { id } });
        return user ? user.username : null;
    } catch (err) {
        console.error('Error fetching username:', err);
        return null;
    }
}

router.get('/user', isAuthenticated, async (req, res) => {
    const id = req.signedCookies.userId;

    const username = await getUsername(id);

    const orders = [
        { id: '12345', date: '2025-01-28', total: 100, items: [{ name: 'Item A', quantity: 1 }, { name: 'Item B', quantity: 2 }] },
        { id: '67890', date: '2025-01-15', total: 50, items: [{ name: 'Item C', quantity: 1 }] },
    ];
    const cart = {
        items: [
            { name: 'Item X', price: 10.5, quantity: 2 },
            { name: 'Item Y', price: 5.0, quantity: 3 },
        ],
        total: 35.5,
    };

    res.render('user', { id, username, orders, cart });
});

module.exports = router;