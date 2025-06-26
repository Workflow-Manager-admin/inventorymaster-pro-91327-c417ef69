const categoryModel = require('../models/category');

// PUBLIC_INTERFACE
/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management
 */
class CategoriesController {
  list(req, res) {
    const categories = categoryModel.getAllCategories();
    res.json(categories);
  }

  get(req, res) {
    const category = categoryModel.findCategoryById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  }

  create(req, res) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name required' });
    }
    const category = categoryModel.insertCategory({ name });
    res.status(201).json(category);
  }

  update(req, res) {
    const id = req.params.id;
    const updated = categoryModel.updateCategory(id, req.body);
    res.json(updated);
  }

  delete(req, res) {
    const id = req.params.id;
    categoryModel.deleteCategory(id);
    res.status(204).send();
  }
}

module.exports = new CategoriesController();
