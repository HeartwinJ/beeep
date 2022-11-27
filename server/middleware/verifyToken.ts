import * as jose from "jose";

export default defineEventHandler(async (event) => {
  if (
    event.req.url?.startsWith("/api/") &&
    !event.req.url?.includes("/api/auth/")
  ) {
    const token = (event.req.headers.authorization as string).replace(
      "Bearer ",
      ""
    );
    if (!token) {
      return { success: false, error: "Missing Token" };
    }
    const decoded = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_TOKEN_SECRET)
    );
    if (!decoded.payload.id) {
      return { success: false, error: "Unauthorized" };
    }
  }
});
