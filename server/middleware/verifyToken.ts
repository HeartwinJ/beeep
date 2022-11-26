import * as jose from "jose";

export default defineEventHandler(async (event) => {
  if (event.req.url?.includes("/api/auth/")) {
    return true;
  }
  const token = event.req.headers.authorization as string;
  if (token) {
    const decoded = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_TOKEN_SECRET)
    );
    if (decoded.payload.id) {
      return true;
    } else {
      return false;
    }
  }
});
