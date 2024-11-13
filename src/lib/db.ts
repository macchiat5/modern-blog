import sqlite3 from "sqlite3";
import { join } from "path";

console.log("데이터베이스 초기화 시작");

// 데이터베이스 파일 경로 설정
const dbPath = join(process.cwd(), "data.db");
console.log("데이터베이스 경로:", dbPath);

function initializeDatabase() {
  console.log("initializeDatabase 함수 실행");

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("데이터베이스 연결 에러:", err);
      return;
    }
    console.log("데이터베이스 연결 성공");

    // 테이블 생성
    db.run(
      `
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
      )
    `,
      (err) => {
        if (err) {
          console.error("테이블 생성 에러:", err);
        } else {
          console.log("테이블 생성 완료");
        }
      }
    );
  });

  return db;
}

// 초기화 실행
console.log("초기화 시도");
const db = initializeDatabase();
console.log("초기화 완료");

export function getDB() {
  return db;
}

export default {
  getDB,
};
