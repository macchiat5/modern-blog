import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import db from "../models/db";

const posts = new Hono();

// 포스트 목록 조회
posts.get("/", async (c) => {
  const posts = db
    .prepare(
      `
    SELECT
      p.*,
      u.username as author_name
    FROM posts p
    LEFT JOIN users u ON p.author_id = u.id
    WHERE p.status = 'published'
    ORDER BY p.created_at DESC
  `
    )
    .all();

  return c.json(posts);
});

// 단일 포스트 조회
posts.get("/:id", async (c) => {
  const id = c.req.param("id");
  const post = db
    .prepare(
      `
    SELECT
      p.*,
      u.username as author_name
    FROM posts p
    LEFT JOIN users u ON p.author_id = u.id
    WHERE p.id = ?
  `
    )
    .get(id);

  if (!post) {
    throw new HTTPException(404, { message: "Post not found" });
  }

  return c.json(post);
});

// 포스트 생성
posts.post("/", async (c) => {
  const body = await c.req.json();
  // 여기에 validation 로직 추가

  const result = db
    .prepare(
      `
    INSERT INTO posts (
      title, content, summary, status,
      meta_description, author_id
    ) VALUES (?, ?, ?, ?, ?, ?)
  `
    )
    .run(
      body.title,
      body.content,
      body.summary,
      body.status || "draft",
      body.meta_description,
      body.author_id
    );

  return c.json({ id: result.lastInsertRowid });
});

export default posts;
