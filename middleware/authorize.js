const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message:
          "Forbidden. You do not have permission to access this resource.",
      });
    }
    next();
  };
};

export default authorize;
