import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import db from "../models/db";

const media = new Hono();

// 미디어 목록 조회
media.get("/", async (c) => {
  const images = db
    .prepare(
      `
    SELECT * FROM images
    ORDER BY created_at DESC
  `
    )
    .all();

  return c.json(images);
});

// 미디어 업로드
media.post("/", async (c) => {
  const file = await c.req.file("file");
  if (!file) {
    throw new HTTPException(400, { message: "No file uploaded" });
  }

  // 파일 처리 로직 (저장 및 최적화)
  const filename = `${Date.now()}-${file.name}`;
  // 여기서 실제 파일 저장 로직 구현

  const result = db
    .prepare(
      `
    INSERT INTO images (
      filename, original_filename, mime_type,
      size, url
    ) VALUES (?, ?, ?, ?, ?)
  `
    )
    .run(filename, file.name, file.type, file.size, `/uploads/${filename}`);

  return c.json({
    id: result.lastInsertRowid,
    url: `/uploads/${filename}`,
  });
});

export default media;
