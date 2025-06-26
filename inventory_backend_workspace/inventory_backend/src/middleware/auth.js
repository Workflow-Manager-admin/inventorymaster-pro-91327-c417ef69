// PUBLIC_INTERFACE
/**
 * Authentication and Authorization Middleware
 * Checks for Authorization header with Bearer JWT, decodes and adds user to req.user.
 * Use `requireRole` to restrict endpoints to specific roles.
 */
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'inventory_secret';

function authRequired(req, res, next) {
  const header = req.headers['authorization'];
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  const token = header.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

/**
 * Authorization middleware factory
 * @param {string[]} roles - e.g., ['Admin'] or ['Manager', 'Admin']
 */
function requireRole(roles) {
  return function (req, res, next) {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
}

module.exports = {
  authRequired,
  requireRole
};
