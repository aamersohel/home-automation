import { sendError, getHeaders } from "h3";
import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  const clientSideRoutes = !event.req.url.startsWith("/api");
  const authRoutes = event.req.url.startsWith("/api/auth/");
  if (clientSideRoutes || authRoutes) {
    return;
  }

  const headers = getHeaders(event);
  const authorizationField = headers["authorization"];
  let token = "";
  if (authorizationField && authorizationField.startsWith("Bearer ")) {
    token = authorizationField.substring(7);
  }

  if (!token) {
    sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      })
    );
  }

  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const verified = jwt.verify(token, jwtSecretKey);
    if (!verified) {
      sendError(
        event,
        createError({
          statusCode: 401,
          statusMessage: "Unauthorized",
        })
      );
    }
  } catch (error) {
    sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Server error",
      })
    );
  }

  const data = jwt.decode(token) as any;

  event.context.auth = data;
});
