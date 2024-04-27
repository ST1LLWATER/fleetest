module.exports = {
  checkAdmin: function (req, res, next) {
    if (req.user) {
      if (req.session.user.admin == true) {
        return next();
      } else {
        return res.json({
          error: 'Access Denied',
        });
      }
    } else {
      next();
    }
  },
};
