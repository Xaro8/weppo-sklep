const Product = require('../models/Product');
const { Op } = require('sequelize');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.render('products', { products: products });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

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


exports.search = async (req, res) => {
  const query = req.query.query; // Get search query from the URL
  if (!query) res.redirect ('/products');
  try {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`  // Enables partial matching
        }
      }
    });

    if (products.length == 0 ) res.redirect ('/products');
    
    res.render('products', { products: products }); 

  } catch (err) {
    console.error(err);
    res.redirect ('/products');
  }
};