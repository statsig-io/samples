import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("todos.db");

export async function createTodoTable() {
  db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL,
        description TEXT,
        completed INTEGER DEFAULT 0,
        edited INTEGER DEFAULT 0,
        serialNumber INTEGER,
        lastViewed INTEGER DEFAULT 0,
        createdDate TEXT,
        modifiedDate TEXT
      )
    `);
}
