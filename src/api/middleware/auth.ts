import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { verify } from "hono/jwt";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = await verify(token, JWT_SECRET);
    c.set("user", payload);
    await next();
  } catch (err) {
    throw new HTTPException(401, { message: "Invalid token" });
  }
}

export async function adminOnly(c: Context, next: Next) {
  const user = c.get("user");
  if (user.role !== "admin") {
    throw new HTTPException(403, { message: "Admin only" });
  }
  await next();
}
