const path = require('path');
const fs = require('fs/promises');

const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const { name, price, description } = req.body;
  const image = req.files && req.files.image;

  if (!name || !price || !description) {
    return res.render('admin', { message: 'Please fill in all fields' });
  }

  try {
    let imagePath = '/images/blank.jpg';
    if (image) {
      const uploadPath = path.join(__dirname, '..', 'public', 'images', image.name);
      image.mv(uploadPath, (err) => {
        if (err) {
          return res.render('admin', { message: 'Error uploading image' });
        }
      });
      imagePath = '/images/' + image.name;
    }
    
    await Product.create({
      name: name,
      price: price,
      description: description,
      imagePath: imagePath
    });

    res.redirect('/products');
  } catch (err) {
    console.log(err);
    res.render('admin', { message: 'Error creating product' });
  }
};

exports.removeProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).render('admin', { message : 'Product ID is required' });
  }

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).render('admin', { message : 'Product not found' });
    }
    
    /* Uwaga, usunie zdjęcie z folderu
    if (product.imagePath) {
      const imagePath = path.join(__dirname, '..', 'public', product.imagePath);
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.log('Error deleting image: ', err);
      }
    }
    */
    await Product.destroy({ where : { id }});
    res.redirect('/products');
  } catch (err) {
    console.log(err);
    res.status(500).render('admin', { message : 'Error removing product' });
  }
};

exports.editProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).render('admin', { message : 'Product ID is required' });
  }

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).render('admin', { message : 'Product not found' });
    }
    
    res.render('edit', {product})
  } catch (err) {
    console.log(err);
    res.status(500).render('admin', { message : 'Error editing product' });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imagePath } = req.body;

  if (!id) {
    return res.status(400).render('admin', { message: 'Product ID is required' });
  }

  try {
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).render('admin', { message: 'Product not found' });
    }
    
    await product.update({ name, description, price, imagePath });
    res.redirect(`/product/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).render('admin', { message: 'Error updating product' });
  }
};
