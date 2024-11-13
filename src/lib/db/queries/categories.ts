import db from "../client";
import type { Category } from "../types";

export const categoryQueries = {
  create: db.prepare(`
    INSERT INTO categories (
      name, slug, description, parent_id, order_index, is_visible
    ) VALUES (?, ?, ?, ?, ?, ?)
  `),

  getAll: db.prepare(`
    SELECT * FROM categories ORDER BY parent_id, order_index ASC
  `),

  getById: db.prepare(`
    SELECT * FROM categories WHERE id = ?
  `),

  update: db.prepare(`
    UPDATE categories
    SET name = ?, slug = ?, description = ?, parent_id = ?,
        order_index = ?, is_visible = ?
    WHERE id = ?
  `),

  delete: db.prepare(`
    DELETE FROM categories WHERE id = ?
  `),
};
