/**
 *
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {*} next
 */
function authorize(req, res, next) {
  if (req.signedCookies.user) {
    req.user = req.signedCookies.user;
    next();
  } else {
    res.redirect("/login?returnUrl=" + req.url);
  }
}
module.exports = authorize;