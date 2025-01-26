const User = require('../models/User');

const isAuthenticated = async (req, res, next) => {
  const userId = req.signedCookies.userId;

  if (!userId) {
    return res.redirect('/login?returnUrl=' + encodeURIComponent(req.url));
  }

  const user = await User.findByPk(userId);

  if (!user) {
    return res.redirect('/login?returnUrl=' + encodeURIComponent(req.url));
  }

  req.user = user;
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }

  res.status(403).send('Access Denied: Admins Only');
};

module.exports = { isAuthenticated, isAdmin };