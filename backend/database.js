import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const sqlite = sqlite3.verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "job-tracker.db");

const db = new sqlite.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      company TEXT NOT NULL,
      jobTitle TEXT NOT NULL,
      dateApplied TEXT NOT NULL,
      status TEXT NOT NULL,
      jobLink TEXT,
      notes TEXT,
      feedback TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);
});

export default db;