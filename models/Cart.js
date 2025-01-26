const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const CartProduct = require('./CartProduct');
const Product = require('./Product');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }
});

Cart.belongsToMany(Product, {
  through: CartProduct
});

Product.belongsToMany(Cart, {
  through: CartProduct
});

module.exports = Cart;