export const prerender = false;

import type { APIRoute } from "astro";
import sqlite3 from "sqlite3";
import { isAuthenticated } from "../../lib/auth";

// DB 연결 함수 추가
function getDB() {
  return new sqlite3.Database("data.db", (err) => {
    if (err) {
      console.error("Database connection error:", err);
    }
  });
}

export const GET: APIRoute = async ({ request }) => {
  const db = getDB(); // 새로운 연결 생성

  try {
    if (!(await isAuthenticated(request))) {
      db.close(); // 연결 닫기
      return new Response(JSON.stringify({ message: "인증이 필요합니다." }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const categories = await new Promise((resolve, reject) => {
      db.all(
        `SELECT c.*, p.name as parent_name
         FROM categories c
         LEFT JOIN categories p ON c.parent_id = p.id
         ORDER BY c.name`,
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });

    db.close(); // 연결 닫기
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    db.close(); // 에러 발생시에도 연결 닫기
    console.error("일반 에러:", error);
    return new Response(JSON.stringify({ message: "서버 오류" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  const db = getDB(); // 새로운 연결 생성

  try {
    if (!(await isAuthenticated(request))) {
      db.close(); // 연결 닫기
      return new Response(JSON.stringify({ message: "인증이 필요합니다." }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const data = await request.json();
    console.log("받은 데이터:", data);

    if (!data.name || !data.slug) {
      db.close(); // 연결 닫기
      return new Response(
        JSON.stringify({ message: "이름과 슬러그는 필수입니다." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const result = await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO categories (name, slug, description, parent_id)
         VALUES (?, ?, ?, ?)`,
        [data.name, data.slug, data.description, data.parentCategory || null],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID });
        }
      );
    });

    db.close(); // 연결 닫기
    return new Response(JSON.stringify(result), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    db.close(); // 에러 발생시에도 연결 닫기
    console.error("일반 에러:", error);
    return new Response(
      JSON.stringify({
        message: "서버 오류",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
