import type { APIContext } from "astro";
import { createToken } from "../../lib/auth";

export async function POST({ request }: APIContext) {
  try {
    const data = await request.json();
    console.log("Received login attempt:", data);

    if (data.username === "admin" && data.password === "admin123") {
      const token = await createToken({
        userId: 1,
        username: "admin",
        role: "admin",
      });

      return new Response(JSON.stringify({ token }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(
      JSON.stringify({
        message: "잘못된 계정 정보입니다.",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({
        message: "서버 에러가 발생했습니다.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
