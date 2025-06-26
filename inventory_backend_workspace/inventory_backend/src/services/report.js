// PUBLIC_INTERFACE
/**
 * Generates tabular inventory report data for use as CSV or PDF.
 */
const itemModel = require('../models/item');
const categoryModel = require('../models/category');
const supplierModel = require('../models/supplier');

/**
 * Returns array of row objects representing item details for reporting.
 */
function generateItemReportData() {
  const categories = categoryModel.getAllCategories()
    .reduce((map, c) => (map[c.id] = c.name, map), {});
  const suppliers = supplierModel.getAllSuppliers()
    .reduce((map, s) => (map[s.id] = s.name, map), {});
  const items = itemModel.getAllItems();
  return items.map(item => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    category: categories[item.categoryId] || '',
    supplier: suppliers[item.supplierId] || '',
    lowStock: item.lowStock ? 'YES' : 'NO'
  }));
}

module.exports = {
  generateItemReportData
};
