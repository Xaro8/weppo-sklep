function isAuthenticated(req, res, next) {
  console.log("signed cookies:", req.signedCookies.user);
  if (req.signedCookies.user) {
    next();
  }
  else {
    res.redirect('/login?returnUrl=' + encodeURIComponent(req.url));
  }
};

module.exports = isAuthenticated;