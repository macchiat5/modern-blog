import type { APIRoute } from "astro";
import db from "../../lib/db";
import { isAuthenticated } from "../../lib/auth";

export const get: APIRoute = async ({ request }) => {
  try {
    if (!(await isAuthenticated(request))) {
      return new Response(JSON.stringify({ message: "인증 필요" }), {
        status: 401,
      });
    }

    const categories = db
      .prepare(
        `
      SELECT
        c.*,
        p.name as parent_name
      FROM categories c
      LEFT JOIN categories p ON c.parent_id = p.id
      ORDER BY c.name
    `
      )
      .all();

    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "서버 오류" }), {
      status: 500,
    });
  }
};

export const post: APIRoute = async ({ request }) => {
  try {
    if (!(await isAuthenticated(request))) {
      return new Response(JSON.stringify({ message: "인증 필요" }), {
        status: 401,
      });
    }

    const data = await request.json();

    const result = db
      .prepare(
        `
      INSERT INTO categories (name, slug, description, parent_id)
      VALUES (?, ?, ?, ?)
    `
      )
      .run(data.name, data.slug, data.description, data.parentCategory || null);

    return new Response(JSON.stringify({ id: result.lastInsertRowid }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "서버 오류" }), {
      status: 500,
    });
  }
};
