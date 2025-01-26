const path = require('path');

const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const { name, price, description } = req.body;
  const image = req.files && req.files.image;

  if (!name || !price || !description) {
    return res.render('admin', { message: 'Please fill in all fields' });
  }

  try {
    let imagePath = '';
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