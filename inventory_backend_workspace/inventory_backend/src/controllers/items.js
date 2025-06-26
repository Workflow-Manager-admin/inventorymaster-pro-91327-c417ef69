const itemModel = require('../models/item');

// PUBLIC_INTERFACE
/**
 * @swagger
 * tags:
 *   - name: Items
 *     description: Inventory item management
 */
class ItemsController {
  // PUBLIC_INTERFACE
  list(req, res) {
    const items = itemModel.getAllItems();
    res.json(items);
  }

  // PUBLIC_INTERFACE
  get(req, res) {
    const item = itemModel.findItemById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  }

  // PUBLIC_INTERFACE
  create(req, res) {
    const { name, quantity, categoryId, supplierId } = req.body;
    if (!name || quantity === undefined) {
      return res.status(400).json({ message: 'Name and quantity required' });
    }
    const item = itemModel.insertItem({ name, quantity, categoryId, supplierId });
    res.status(201).json(item);
  }

  // PUBLIC_INTERFACE
  update(req, res) {
    const id = req.params.id;
    const updated = itemModel.updateItem(id, req.body);
    res.json(updated);
  }

  // PUBLIC_INTERFACE
  delete(req, res) {
    const id = req.params.id;
    itemModel.deleteItem(id);
    res.status(204).send();
  }

  // PUBLIC_INTERFACE
  lowStock(req, res) {
    const items = itemModel.getLowStockItems();
    res.json(items);
  }
}

module.exports = new ItemsController();
