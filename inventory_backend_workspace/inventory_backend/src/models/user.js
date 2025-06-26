const db = require('./db');

// PUBLIC_INTERFACE
function findUserByUsername(username) {
  return db.get('users').find({ username }).value();
}

// PUBLIC_INTERFACE
function findUserById(id) {
  return db.get('users').find({ id: Number(id) }).value();
}

// PUBLIC_INTERFACE
function insertUser(user) {
  const ids = db.get('users').map('id').value();
  const id = ids.length ? Math.max(...ids) + 1 : 1;
  user.id = id;
  db.get('users').push(user).write();
  return user;
}

// PUBLIC_INTERFACE
function maskUser(user) {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
}

// PUBLIC_INTERFACE
function getAllUsers() {
  return db.get('users').map(maskUser).value();
}

// PUBLIC_INTERFACE
function updateUser(id, update) {
  return db.get('users')
    .find({ id: Number(id) })
    .assign(update)
    .write();
}

// PUBLIC_INTERFACE
function deleteUser(id) {
  return db.get('users').remove({ id: Number(id) }).write();
}

module.exports = {
  findUserByUsername,
  findUserById,
  insertUser,
  getAllUsers,
  updateUser,
  deleteUser,
  maskUser
};
