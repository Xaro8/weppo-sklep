const User = require('../models/User');

async function getUsername(id) {
    try {
        const user = await User.findOne({ where: { id } });
        return user ? user.username : null;
    } catch (err) {
        console.error('Error fetching username:', err);
        return null;
    }
}

async function removeUser(id) {
	try {
        await User.destroy({where: {id}})
	} catch (err) {
		console.log('Unable to delete user: ', err);
	}
};

exports.getUser = async (req, res) => {
    const id = req.signedCookies.userId;

    const username = await getUsername(id);

    const orders = [
        { id: '12345', date: '2025-01-28', total: 100, items: [{ name: 'Item A', quantity: 1 }, { name: 'Item B', quantity: 2 }] },
        { id: '67890', date: '2025-01-15', total: 50, items: [{ name: 'Item C', quantity: 1 }] },
    ];

    res.render('user', { id, username, orders });
};

exports.deleteUser = async (req, res) => {
    const id = req.signedCookies.userId;
    removeUser(id);
    res.clearCookie('userId');
	res.redirect('/');
};