import { Hono } from 'hono';

const router = new Hono();

router.get('/', (c) => c.json({ status: 'tes' }));
router.get('/health', (c) => c.json({ status: 'OK' }));

export default router;
