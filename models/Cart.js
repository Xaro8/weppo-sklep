const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const CartProduct = require('./CartProduct');
const Product = require('./Product');
const User = require('./User');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }
});

Cart.belongsToMany(Product, {
  through: CartProduct,
  foreignKey: 'cardId',
  otherKey: 'productId'
});

module.exports = Cart;