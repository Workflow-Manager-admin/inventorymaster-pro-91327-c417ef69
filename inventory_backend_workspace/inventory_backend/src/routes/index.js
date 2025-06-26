const express = require('express');
const healthController = require('../controllers/health');
const authController = require('../controllers/auth');
const itemsController = require('../controllers/items');
const suppliersController = require('../controllers/suppliers');
const categoriesController = require('../controllers/categories');
const reportController = require('../controllers/report');
const { authRequired, requireRole } = require('../middleware/auth');

const router = express.Router();

// Health endpoint
router.get('/', healthController.check.bind(healthController));

// --- Authentication ---
router.post('/auth/login', authController.login.bind(authController));
router.get('/auth/me', authRequired, authController.me.bind(authController));
router.post('/auth/logout', authRequired, authController.logout.bind(authController));
// Users (admin only)
router.get('/users', authRequired, requireRole(['Admin']), authController.listUsers.bind(authController));
router.post('/users', authRequired, requireRole(['Admin']), authController.createUser.bind(authController));
router.put('/users/:id', authRequired, requireRole(['Admin']), authController.updateUser.bind(authController));
router.delete('/users/:id', authRequired, requireRole(['Admin']), authController.deleteUser.bind(authController));

// --- Items ---
router.get('/items', authRequired, itemsController.list.bind(itemsController));
router.get('/items/:id', authRequired, itemsController.get.bind(itemsController));
router.post('/items', authRequired, requireRole(['Admin', 'Manager']), itemsController.create.bind(itemsController));
router.put('/items/:id', authRequired, requireRole(['Admin', 'Manager']), itemsController.update.bind(itemsController));
router.delete('/items/:id', authRequired, requireRole(['Admin']), itemsController.delete.bind(itemsController));
router.get('/items-low-stock', authRequired, itemsController.lowStock.bind(itemsController));

// --- Suppliers ---
router.get('/suppliers', authRequired, suppliersController.list.bind(suppliersController));
router.get('/suppliers/:id', authRequired, suppliersController.get.bind(suppliersController));
router.post('/suppliers', authRequired, requireRole(['Admin', 'Manager']), suppliersController.create.bind(suppliersController));
router.put('/suppliers/:id', authRequired, requireRole(['Admin', 'Manager']), suppliersController.update.bind(suppliersController));
router.delete('/suppliers/:id', authRequired, requireRole(['Admin']), suppliersController.delete.bind(suppliersController));

// --- Categories ---
router.get('/categories', authRequired, categoriesController.list.bind(categoriesController));
router.get('/categories/:id', authRequired, categoriesController.get.bind(categoriesController));
router.post('/categories', authRequired, requireRole(['Admin', 'Manager']), categoriesController.create.bind(categoriesController));
router.put('/categories/:id', authRequired, requireRole(['Admin', 'Manager']), categoriesController.update.bind(categoriesController));
router.delete('/categories/:id', authRequired, requireRole(['Admin']), categoriesController.delete.bind(categoriesController));

// --- Reports ---
router.get('/reports/csv', authRequired, requireRole(['Admin', 'Manager']), reportController.csv.bind(reportController));
router.get('/reports/pdf', authRequired, requireRole(['Admin', 'Manager']), reportController.pdf.bind(reportController));

module.exports = router;
