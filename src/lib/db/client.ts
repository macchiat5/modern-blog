import Database from "better-sqlite3";
import { scheme } from "./scheme";

const db = new Database("blog.db");

// 개발 환경에서만 활성화
db.pragma("journal_mode = WAL");

// 스키마 초기화
export function initializeDatabase() {
  const statements = scheme.split(";").filter((stmt) => stmt.trim());
  db.transaction(() => {
    statements.forEach((stmt) => {
      if (stmt.trim()) {
        db.prepare(stmt).run();
      }
    });
  })();
}

export default db;
