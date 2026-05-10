require("dotenv").config();
const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = process.env.DB_PATH || path.join(__dirname, "../autosalon.db");

let db = null;

const initDatabase = () => {
  if (db) {
    return db;
  }

  try {
    db = new Database(DB_PATH);

    db.pragma("foreign_keys = ON");

    const schema = `
      CREATE TABLE IF NOT EXISTS cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        price REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        car_id INTEGER NOT NULL,
        img_url TEXT NOT NULL,
        type TEXT,
        FOREIGN KEY (car_id) REFERENCES cars(id)
      );

      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        car_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (car_id) REFERENCES cars(id)
      );

      CREATE TABLE IF NOT EXISTS test_drives (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        car_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (car_id) REFERENCES cars(id)
      );

      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS brands (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS team (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        position TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

    db.exec(schema);
    console.log("SQLite database initialized successfully at", DB_PATH);

    return db;
  } catch (error) {
    console.error("Database initialization error:", error);
    throw new Error("Failed to initialize SQLite database");
  }
};

const getDatabase = () => {
  if (!db) {
    return initDatabase();
  }
  return db;
};

const closeDatabase = () => {
  if (db) {
    db.close();
    db = null;
  }
};

module.exports = {
  initDatabase,
  getDatabase,
  closeDatabase,
  DB_PATH,
};