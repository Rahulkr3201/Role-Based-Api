const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // this req.role comes from the earlier middleware which was stored in the tokken
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "access denied" });
    }
    next();
  };
};

module.exports = authorizeRoles;
