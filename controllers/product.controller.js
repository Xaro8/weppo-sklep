const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.render('products', { products: products });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
}

exports.getProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('product', { product: product });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};