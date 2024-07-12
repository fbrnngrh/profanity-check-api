import { Context, Next } from 'hono';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
});

export async function rateLimitMiddleware(c: Context, next: Next) {
    const user = c.get('user');
    const key = user ? user.id.toString() : c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || c.req.header('cf-connecting-ip');
  
    try {
      await rateLimiter.consume(key);
      await next();
    } catch (error) {
      return c.json({ error: 'Terlalu banyak permintaan' }, 429);
    }
  }