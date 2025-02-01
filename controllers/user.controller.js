const User = require('../models/User');
const Cart = require('../models/Cart');
const CartProduct = require('../models/CartProduct');
const Product = require('../models/Product');
const Order = require('../models/Order');
const OrderProduct = require('../models/OrderProduct');

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
    await User.destroy({where: {id}});
  } catch (err) {
    console.log('Unable to delete user: ', err);
  }
};

exports.getUser = async (req, res) => {
  const userId = req.signedCookies.userId;

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

exports.makeOrder = async (req, res) => {
  const userId = req.signedCookies.userId;

  try {
    let cart = await Cart.findOne({ 
      where: { userId },
      include: {
        model: Product,
        through: { attributes: ['quantity'] }
      }
    });

    if (!cart) {
      return res.status(400).send('Cart not found');
    }

    const cartItems = cart.Products.map(prod => ({
      id: prod.id,
      price: prod.price,
      quantity: prod.CartProduct.quantity,
      totalPrice: prod.price * prod.CartProduct.quantity
    }));

    const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    let order = await Order.create({
      userId: userId,
      price: total,
      paid: true
    });

    await Promise.all(cartItems.map(item =>
      OrderProduct.create({
        orderId: order.id,
        productId: item.id,
        quantity: item.quantity
      })
    ));

    await CartProduct.destroy({ where: { cartId: cart.id }});
    res.redirect('/user');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
}