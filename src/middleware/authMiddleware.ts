import { Context, Next } from 'hono';
import { UserRepository } from '../repositories/userRepository';

export async function authMiddleware(c: Context, next: Next) {
  const apiKey = c.req.header('X-API-Key');

  if (!apiKey) {
    return c.json({ error: 'API key is missing' }, 401);
  }

  const userRepository = new UserRepository();
  const user = await userRepository.findByApiKey(apiKey);

  if (!user) {
    return c.json({ error: 'Invalid API key' }, 401);
  }

  c.set('user', user);
  await next();
}