import { Context } from "hono";
import { ProfanityCheckService } from "../services/ProfanityCheckService";
import { z } from "zod";
import logger from "../utils/logger";

/**
 * Skema validasi untuk permintaan pengecekan profanitas.
 * @property {string} text - Teks yang akan diperiksa (minimal 1 karakter).
 * @property {string} filter_level - Tingkat filter profanitas ("Ringan", "Sedang", atau "Berat"). Default: "Sedang".
 */
const checkSchema = z.object({
    text: z.string().min(1),
    filter_level: z.enum(["Ringan", "Sedang", "Berat"]).default("Sedang"),
  });

/**
 * Controller untuk menangani permintaan pengecekan profanitas.
 */
export class CheckController {
    private profanityCheckService: ProfanityCheckService;

    /**
     * Membuat instance baru dari CheckController.
     */
    constructor(){
        this.profanityCheckService = new ProfanityCheckService();
    }

    /**
     * Menangani permintaan pengecekan profanitas.
     */
    async check(c: Context): Promise<Response> {
        try {
            logger.info('Checking profanity');
            const body = await c.req.json()
            const {text, filter_level} = checkSchema.parse(body)
            const result = await this.profanityCheckService.checkText(text, filter_level)
            logger.info('Profanity check result', result);
            return c.json(result, 200)
        } catch (error) {
            if (error instanceof z.ZodError) {
                logger.error('Validation error');
                return c.json({ error: "Input tidak valid" }, 400);
              }
              logger.error('Internal server error');
              return c.json({ error: "Terjadi kesalahan internal server" }, 500);
            
        }
    }
  }