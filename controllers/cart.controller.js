const Cart = require('../models/Cart');
const CartProduct = require('../models/CartProduct');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  const userId = req.signedCookies.userId;
  
  try {
    const cart = await Cart.findOne({ 
      where: { userId },
      include: {
        model: Product,
        through: { attributes: ['quantity'] }
      }
    });

    if (!cart) {
      return res.render('cart', { cart: { items: [], total: 0 }});
    }

    const cartItems = cart.Products.map(prod => ({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      quantity: prod.CartProduct.quantity,
      totalPrice: prod.price * prod.CartProduct.quantity
    }));

    const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    res.render('cart', { cart: { items: cartItems, total: total }});
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  } 
};

exports.addProductToCart = async (req, res) => {
  const productId = req.params.id;
  const quantity = 1;
  const userId = req.signedCookies.userId;

  try {
    let cart = await Cart.findOne({ where: { userId }});

    if (!cart) {
      //return res.status(400).send('Cart not found');
      cart = await Cart.create({ userId });
      console.log('\n\nCreated cart\n\n');
    } else {
      console.log('\n\nFound cart with id ', cart.id, '\n\n');
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(400).send('Product not found');
    }
    console.log('\n\nProduct found\n\n');
    const cartProduct = await CartProduct.findOne({
      where: { cartId: cart.id, productId: productId }
    });

    if (cartProduct) {
      cartProduct.quantity += quantity;
      await cartProduct.save();
    }
    else {
      //await cart.addProduct(product, { through: { quantity: quantity }});
      await CartProduct.create({
        cartId: cart.id,
        productId: product.id,
        quantity: quantity
      });
    }

    res.redirect(`/product/${ productId }`);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

exports.removeProductFromCart = async (req, res) => {
  const productId = req.params.id;
  const userId = req.signedCookies.userId;

  try {
    const cart = await Cart.findOne({ where: { userId: userId }});

    if (!cart) {
      return res.status(400).send('Cart not found');
    }

    if (!await Product.findByPk(productId)) {
      return res.status(400).send('Product not found');
    }

    const cartProduct = await CartProduct.findOne({
      where: { cartId: cart.id, productId: productId }
    });

    if (cartProduct) {
      await cartProduct.destroy();
      res.redirect('/cart');
    }
    else {
      res.status(404).send('Product not in cart');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};