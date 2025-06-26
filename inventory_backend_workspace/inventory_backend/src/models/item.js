const db = require('./db');
const categoryModel = require('./category');
const supplierModel = require('./supplier');

const LOW_STOCK_THRESHOLD = 5;

// PUBLIC_INTERFACE
function getAllItems() {
  return db.get('items').value().map(item => ({
    ...item,
    lowStock: item.quantity <= LOW_STOCK_THRESHOLD
  }));
}

// PUBLIC_INTERFACE
function findItemById(id) {
  const item = db.get('items').find({ id: Number(id) }).value();
  if (!item) return null;
  return {
    ...item,
    lowStock: item.quantity <= LOW_STOCK_THRESHOLD
  };
}

// PUBLIC_INTERFACE
function insertItem(item) {
  const ids = db.get('items').map('id').value();
  const id = ids.length ? Math.max(...ids) + 1 : 1;
  item.id = id;
  db.get('items').push(item).write();
  return findItemById(id);
}

// PUBLIC_INTERFACE
function updateItem(id, update) {
  db.get('items').find({ id: Number(id) }).assign(update).write();
  return findItemById(id);
}

// PUBLIC_INTERFACE
function deleteItem(id) {
  db.get('items').remove({ id: Number(id) }).write();
}

// PUBLIC_INTERFACE
function getLowStockItems() {
  return db.get('items').filter(item => item.quantity <= LOW_STOCK_THRESHOLD).value().map(item => ({
    ...item,
    lowStock: true
  }));
}

module.exports = {
  getAllItems,
  findItemById,
  insertItem,
  updateItem,
  deleteItem,
  getLowStockItems
};
