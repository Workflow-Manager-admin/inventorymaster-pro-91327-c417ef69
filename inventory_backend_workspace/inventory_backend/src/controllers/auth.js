const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');

require('dotenv').config();
const SECRET = process.env.JWT_SECRET || 'inventory_secret';
const TOKEN_EXPIRY = '8h';

// PUBLIC_INTERFACE
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication and user management
 */
class AuthController {
  // PUBLIC_INTERFACE
  /**
   * POST /auth/login
   * User login with username/password, returns JWT for session
   */
  async login(req, res) {
    const { username, password } = req.body;
    const user = userModel.findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }
    // Password check (no hash for demo, but use bcrypt in prod)
    const valid = process.env.NODE_ENV === 'production'
      ? await bcrypt.compare(password, user.password)
      : password === user.password;
    if (!valid) return res.status(401).json({ message: 'Invalid username or password.' });

    const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, SECRET, { expiresIn: TOKEN_EXPIRY });
    res.json({
      token,
      user: userModel.maskUser(user)
    });
  }

  // PUBLIC_INTERFACE
  /**
   * GET /auth/me
   * Return the current authenticated user
   */
  me(req, res) {
    const user = userModel.findUserById(req.user.id);
    return res.json(userModel.maskUser(user));
  }

  // PUBLIC_INTERFACE
  /**
   * POST /auth/logout
   * Logout endpoint (JWT is stateless so just respond)
   */
  logout(req, res) {
    // No-op for JWT
    res.json({ message: 'Logged out' });
  }

  // PUBLIC_INTERFACE (Admin only)
  /**
   * GET, POST, PUT, DELETE users (Admin only)
   */
  listUsers(req, res) {
    const users = userModel.getAllUsers();
    res.json(users);
  }

  createUser(req, res) {
    const { username, password, role, name } = req.body;
    if (!(username && password && role)) {
      return res.status(400).json({ message: 'Missing fields.' });
    }
    if (userModel.findUserByUsername(username)) {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    const user = userModel.insertUser({ username, password, role, name });
    res.status(201).json(userModel.maskUser(user));
  }

  updateUser(req, res) {
    const id = req.params.id;
    const updated = userModel.updateUser(id, req.body);
    res.json(userModel.maskUser(updated));
  }

  deleteUser(req, res) {
    const id = req.params.id;
    userModel.deleteUser(id);
    res.status(204).send();
  }
}

module.exports = new AuthController();
