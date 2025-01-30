const Cart = require('./Cart');
const Product = require('./Product');
const CartProduct = require('./CartProduct');

Cart.belongsToMany(Product, {
    through: CartProduct,
    foreignKey: 'cartId',
    otherKey: 'productId'
});

Product.belongsToMany(Cart, {
    through: CartProduct,
    foreignKey: 'productId',
    otherKey: 'cartId'
});

CartProduct.belongsTo(Cart, { foreignKey: 'cartId' });
CartProduct.belongsTo(Product, { foreignKey: 'productId' });