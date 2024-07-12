import { Context, Next } from 'hono';
import { AppError, ValidationError, AuthenticationError, RateLimitError } from '../utils/errors';
import { ZodError } from 'zod';
import { StatusCode } from 'hono/utils/http-status';

export async function errorHandlerMiddleware(c: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return c.json({ error: "Validation error", details: error.errors }, 400);
    }

    if (error instanceof ValidationError) {
      return c.json({ error: error.message }, error.statusCode as StatusCode);
    }

    if (error instanceof AuthenticationError) {
      return c.json({ error: error.message }, error.statusCode as StatusCode);
    }

    if (error instanceof RateLimitError) {
      return c.json({ error: error.message }, error.statusCode as StatusCode);
    }

    if (error instanceof AppError) {
      return c.json({ error: error.message }, error.statusCode as StatusCode);
    }

    return c.json({ error: "Internal server error" }, 500);
  }
}