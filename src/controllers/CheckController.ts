import { Context } from "hono";
import { ProfanityCheckService } from "../services/ProfanityCheckService";
import { z } from "zod";
import logger from "../utils/logger";

/**
 * Skema validasi untuk permintaan pengecekan profanitas.
 * @property {string} text - Teks yang akan diperiksa (minimal 1 karakter, maksimal 1000 karakter, dan terdiri dari lebih dari satu kata).
 * @property {string} filter_level - Tingkat filter profanitas ("Ringan", "Sedang", atau "Berat"). Default: "Sedang".
 */
const checkSchema = z.object({
    text: z.string()
        .min(1)
        .max(1000)
        .refine(
            (text) => text.trim().split(/\s+/).length > 1,
            {
                message: "Teks harus terdiri dari lebih dari satu kata"
            }
        ),
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
        const startTime = Date.now();
        try {
            logger.info('Memulai pemeriksaan profanitas');
            const body = await c.req.json();
            const { text, filter_level } = checkSchema.parse(body);

            const result = await this.profanityCheckService.checkText(text, filter_level);

            const endTime = Date.now();
            logger.info('Pemeriksaan profanitas selesai', {
                executionTime: endTime - startTime,
                textLength: text.length,
                filterLevel: filter_level,
                profanityCount: result.profanity_count
            });

            return c.json({
                status: 'success',
                message: "Pemeriksaan profanitas selesai",
                data: {
                    contains_profanity: result.contains_profanity,
                    profanity_count: result.profanity_count,
                    profanities: result.profanities,
                    censored_text: result.censored_text,
                    message: result.message,
                    overall_severity: result.overall_severity
                }
            }, 200);
        } catch (error) {
            const endTime = Date.now();
            if (error instanceof z.ZodError) {
                logger.warn('Kesalahan validasi input', {
                    executionTime: endTime - startTime,
                    error: error.errors
                });
                return c.json({ 
                    status: 'error',
                    message: "Input tidak valid",
                    errors: error.errors
                }, 400);
            }
            logger.error('Kesalahan internal server', {
                executionTime: endTime - startTime,
                error: error instanceof Error ? error.message : 'Unknown error'
            });
            return c.json({ 
                status: 'error',
                message: "Terjadi kesalahan internal server"
            }, 500);
        }
    }
  }