const db = require('./db');

// PUBLIC_INTERFACE
function getAllCategories() {
  return db.get('categories').value();
}

// PUBLIC_INTERFACE
function findCategoryById(id) {
  return db.get('categories').find({ id: Number(id) }).value();
}

// PUBLIC_INTERFACE
function insertCategory(category) {
  const ids = db.get('categories').map('id').value();
  const id = ids.length ? Math.max(...ids) + 1 : 1;
  category.id = id;
  db.get('categories').push(category).write();
  return category;
}

// PUBLIC_INTERFACE
function updateCategory(id, update) {
  return db.get('categories').find({ id: Number(id) }).assign(update).write();
}

// PUBLIC_INTERFACE
function deleteCategory(id) {
  return db.get('categories').remove({ id: Number(id) }).write();
}

module.exports = {
  getAllCategories,
  findCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory
};
