const db = require('./db');

// PUBLIC_INTERFACE
function getAllSuppliers() {
  return db.get('suppliers').value();
}

// PUBLIC_INTERFACE
function findSupplierById(id) {
  return db.get('suppliers').find({ id: Number(id) }).value();
}

// PUBLIC_INTERFACE
function insertSupplier(supplier) {
  const ids = db.get('suppliers').map('id').value();
  const id = ids.length ? Math.max(...ids) + 1 : 1;
  supplier.id = id;
  db.get('suppliers').push(supplier).write();
  return supplier;
}

// PUBLIC_INTERFACE
function updateSupplier(id, update) {
  return db.get('suppliers').find({ id: Number(id) }).assign(update).write();
}

// PUBLIC_INTERFACE
function deleteSupplier(id) {
  return db.get('suppliers').remove({ id: Number(id) }).write();
}

module.exports = {
  getAllSuppliers,
  findSupplierById,
  insertSupplier,
  updateSupplier,
  deleteSupplier
};
