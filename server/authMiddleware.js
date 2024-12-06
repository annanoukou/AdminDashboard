const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
      const user = jwt.verify(token, SECRET_KEY);

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden: Access denied' });
      }

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = authorize;
