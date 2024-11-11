import { Hono } from "hono";
import { posts, categories } from "../db/queries";
import type { Post, Category } from "../db/types";

const api = new Hono();

// Posts endpoints
api.get("/posts", (c) => {
  try {
    const allPosts = posts.getPublished.all();
    return c.json(allPosts);
  } catch (error) {
    return c.json({ error: "Failed to fetch posts" }, 500);
  }
});

api.get("/posts/:slug", (c) => {
  try {
    const { slug } = c.req.param();
    const post = posts.getBySlug.get(slug);

    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json(post);
  } catch (error) {
    return c.json({ error: "Failed to fetch post" }, 500);
  }
});

api.post("/posts", async (c) => {
  try {
    const data = await c.req.json<Post>();
    const result = posts.create.run(data);
    return c.json({ id: result.lastInsertRowid }, 201);
  } catch (error) {
    return c.json({ error: "Failed to create post" }, 500);
  }
});

// Categories endpoints
api.get("/categories", (c) => {
  try {
    const allCategories = categories.getAll.all();
    return c.json(allCategories);
  } catch (error) {
    return c.json({ error: "Failed to fetch categories" }, 500);
  }
});

api.post("/categories", async (c) => {
  try {
    const data = await c.req.json<Category>();
    const result = categories.create.run(data);
    return c.json({ id: result.lastInsertRowid }, 201);
  } catch (error) {
    return c.json({ error: "Failed to create category" }, 500);
  }
});

export default api;
