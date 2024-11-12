import * as jose from "jose";

const JWT_SECRET = new TextEncoder().encode(
  import.meta.env.JWT_SECRET || "your-secret-key"
);

export async function isAuthenticated(request: Request): Promise<boolean> {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      console.log("No token found");
      return false;
    }

    console.log("Verifying token:", token);
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    console.log("Token payload:", payload);
    return true;
  } catch (err) {
    console.error("Auth error:", err);
    return false;
  }
}

export function getTokenFromRequest(request: Request): string | null {
  // 헤더에서 먼저 확인
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  // 쿠키에서 확인
  const cookie = request.headers.get("cookie");
  const match = cookie?.match(/token=([^;]+)/);
  return match ? match[1] : null;
}

export async function createToken(payload: any): Promise<string> {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
}
