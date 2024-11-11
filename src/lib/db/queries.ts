import db from "./client";
import type { Post, Category } from "./types";

export const posts = {
  create: db.prepare(`
        INSERT INTO posts (
            slug, title, content, summary, feature_image,
            feature_image_alt, keywords, published, view_count
        ) VALUES (
            @slug, @title, @content, @summary, @feature_image,
            @feature_image_alt, @keywords, @published, @view_count
        )
    `),

  getBySlug: db.prepare(`
        SELECT * FROM posts WHERE slug = ?
    `),

  getPublished: db.prepare(`
        SELECT * FROM posts
        WHERE published = true
        ORDER BY created_at DESC
    `),

  update: db.prepare(`
        UPDATE posts SET
            title = @title,
            content = @content,
            summary = @summary,
            feature_image = @feature_image,
            feature_image_alt = @feature_image_alt,
            keywords = @keywords,
            published = @published,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = @id
    `),
};

export const categories = {
  create: db.prepare(`
        INSERT INTO categories (
            name, slug, description, parent_id,
            order_index, is_visible
        ) VALUES (
            @name, @slug, @description, @parent_id,
            @order_index, @is_visible
        )
    `),

  getAll: db.prepare(`
        SELECT * FROM categories
        ORDER BY order_index ASC
    `),

  getBySlug: db.prepare(`
        SELECT * FROM categories WHERE slug = ?
    `),
};
