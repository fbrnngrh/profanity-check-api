import { Hono } from 'hono';
import { CheckController } from '../controllers/CheckController';
import { ProfanityListController } from '../controllers/ProfanityListController';

const router = new Hono();

const checkController = new CheckController();
const profanityListController = new ProfanityListController();


router.get("/", (c) => c.text('This is profanity checker API'));
router.post("/check", (c) => checkController.check(c));
router.get("/profanity-list", (c) => profanityListController.getProfanityList(c));

export default router;
