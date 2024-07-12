import { Context } from "hono";
import { ProfanityListService } from "../services/ProfanityListService";
import { z } from "zod";
import logger from "../utils/logger";

/**
 * Skema validasi untuk query parameter tingkat filter profanitas.
 */
const querySchema = z.object({
  filter_level: z.enum(["Ringan", "Sedang", "Berat"]).default("Sedang"),
});

/**
 * Controller untuk mengelola daftar kata-kata profanitas.
 */
export class ProfanityListController {
  private profanityListService: ProfanityListService;

  /**
   * Membuat instance baru dari ProfanityListController.
   */
  constructor() {
    this.profanityListService = new ProfanityListService();
  }

  /**
   * Mengambil daftar kata-kata profanitas berdasarkan tingkat filter.
   * @param c - Konteks Hono untuk menangani permintaan HTTP.
   * @returns Response JSON berisi daftar kata-kata profanitas atau pesan kesalahan.
   */
  async getProfanityList(c: Context) {
    try {
      logger.info('Mengambil daftar kata-kata profanitas');
      const query = c.req.query();
      const { filter_level } = querySchema.parse(query);

      const profanityList = await this.profanityListService.getProfanityList(filter_level);
      logger.info('Daftar kata-kata profanitas', profanityList);
      return c.json({ profanity_list: profanityList }, 200);
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error('Kesalahan validasi');
        return c.json({ error: "Input tidak valid" }, 400);
      }
      logger.error('Kesalahan internal server');
      return c.json({ error: "Terjadi kesalahan internal server" }, 500);
    }
  }
}