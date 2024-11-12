export interface User {
  id: number;
  username: string;
  role: string;
}

export interface JWTPayload {
  userId: number;
  role: string;
}
