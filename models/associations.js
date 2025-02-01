const Cart = require('./Cart');
const Product = require('./Product');
const CartProduct = require('./CartProduct');
const Order = require('./Order');
const OrderProduct = require('./OrderProduct');
const User = require('./User');


User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

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

Product.belongsToMany(Order, {
    through: OrderProduct,
    foreignKey: 'productId',
    otherKey: 'orderId'
});

Order.belongsToMany(Product, {
    through: OrderProduct,
    foreignKey: 'orderId',
    otherKey: 'productId'
});

OrderProduct.belongsTo(Order, { foreignKey: 'orderId' });
OrderProduct.belongsTo(Product, { foreignKey: 'productId' });