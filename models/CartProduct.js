const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CartProduct = sequelize.define('CartProduct', {
  cartId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

module.exports = CartProduct;