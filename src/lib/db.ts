import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db: any = null;

export async function getDb() {
  if (!db) {
    db = await open({
      filename: "data.db",
      driver: sqlite3.Database,
    });

    // 테이블 생성
    await db.exec(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        description TEXT,
        parent_id INTEGER,
        order_index INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_id) REFERENCES categories(id)
      );
    `);
  }
  return db;
}

export default { getDb };
