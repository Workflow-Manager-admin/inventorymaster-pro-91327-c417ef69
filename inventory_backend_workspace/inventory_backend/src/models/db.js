const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Use a persistent JSON file for data storage
const adapter = new FileSync(path.join(__dirname, '..', '..', 'data', 'db.json'));
const db = low(adapter);

// Seed the database with default structure if it doesn't exist
db.defaults({
  users: [
    // Default admin user for initial login
    { id: 1, username: 'admin', password: 'adminpass', role: 'Admin', name: 'System Admin' }
  ],
  items: [],
  suppliers: [],
  categories: [],
  sessions: []
}).write();

module.exports = db;
