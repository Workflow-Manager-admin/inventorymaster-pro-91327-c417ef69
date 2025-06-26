const supplierModel = require('../models/supplier');

// PUBLIC_INTERFACE
/**
 * @swagger
 * tags:
 *   - name: Suppliers
 *     description: Supplier management
 */
class SuppliersController {
  list(req, res) {
    const suppliers = supplierModel.getAllSuppliers();
    res.json(suppliers);
  }

  get(req, res) {
    const supplier = supplierModel.findSupplierById(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.json(supplier);
  }

  create(req, res) {
    const { name, email, phone } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name required' });
    }
    const supplier = supplierModel.insertSupplier({ name, email, phone });
    res.status(201).json(supplier);
  }

  update(req, res) {
    const id = req.params.id;
    const updated = supplierModel.updateSupplier(id, req.body);
    res.json(updated);
  }

  delete(req, res) {
    const id = req.params.id;
    supplierModel.deleteSupplier(id);
    res.status(204).send();
  }
}

module.exports = new SuppliersController();
