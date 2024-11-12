import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import posts from "./routes/posts";
import media from "./routes/media";
import { authMiddleware } from "./middleware/auth";

const api = new Hono();

// 미들웨어
api.use("*", logger());
api.use("*", cors());

// Public routes
api.get("/health", (c) => c.json({ status: "ok" }));

// Protected routes
const protected = new Hono();
protected.use("*", authMiddleware);

protected.route("/posts", posts);
protected.route("/media", media);

api.route("/api/v1", protected);

export default api;
