import { defineEventHandler, readBody, sendError, createError } from "h3";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const { appId, name, password } = await readBody(event);

  if (
    appId === process.env.APP_ID &&
    password === process.env.MASTER_PASSWORD
  ) {
    return {
      token: jwt.sign(
        {
          name,
        },
        process.env.JWT_SECRET_KEY,
        {
          algorithm: "HS256",
          expiresIn: "1y",
          audience: "all",
          issuer: "Aamer Sohel",
        }
      ),
    };
  } else {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Invalid Credentials",
      })
    );
  }
});
