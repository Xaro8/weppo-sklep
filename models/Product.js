const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    notEmpty: false
  },
  price: {
    type: DataTypes.DECIMAL(20, 2),
    allowNull: false,
    notEmpty: true,
  },
  imagePath: {
    type: DataTypes.STRING
  }
});

module.exports = Product;