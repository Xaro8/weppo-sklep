const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');

router.get('/admin/orders', isAuthenticated, isAdmin, adminController.getOrders);
router.get('/admin/users', isAuthenticated, isAdmin, adminController.getUsers);
router.get('/admin/add-product', isAuthenticated, isAdmin, (req, res) => {
  res.render('admin/add-product');
});

router.post('/admin/add-product', isAuthenticated, isAdmin, adminController.addProduct);
router.post('/admin/edit-product/:id', isAuthenticated, isAdmin, adminController.editProduct);
router.post('/admin/remove-product/:id', isAuthenticated, isAdmin, adminController.removeProduct);
router.post("/admin/update-product/:id", isAuthenticated, isAdmin, adminController.updateProduct);

module.exports = router;