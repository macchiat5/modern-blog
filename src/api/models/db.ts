import Database from "better-sqlite3";
import { join } from "path";

const db = new Database(join(process.cwd(), "data.db"));

// 데이터베이스 초기화 함수
export function initializeDatabase() {
  // 이전에 정의한 테이블 생성 쿼리들을 실행
  db.exec(`
    -- 여기에 이전에 작성한 CREATE TABLE 구문들이 들어갑니다
  `);
}

export default db;
