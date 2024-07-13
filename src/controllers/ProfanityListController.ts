import { Context } from "hono";
import { ProfanityListService } from "../services/ProfanityListService";
import { z } from "zod";
import logger from "../utils/logger";

/**
 * Skema validasi untuk query parameter tingkat filter profanitas, halaman, dan batas item per halaman.
 */
const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 15;
const DEFAULT_PAGE = 1;

const querySchema = z.object({
  filter_level: z.enum(["Ringan", "Sedang", "Berat"]).default("Sedang"),
  page: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().positive().max(1000)).default(DEFAULT_PAGE.toString()),
  limit: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().positive().max(MAX_LIMIT)).default(DEFAULT_LIMIT.toString()),
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
   * Mengambil daftar kata-kata profanitas berdasarkan tingkat filter, halaman, dan batas item per halaman.
   * @param c - Konteks Hono untuk menangani permintaan HTTP.
   * @returns Response JSON berisi daftar kata-kata profanitas, informasi paginasi, daftar kategori, dan statistik.
   */
  async getProfanityList(c: Context) {
    try {
      logger.info('Mengambil daftar kata-kata profanitas');
      const query = c.req.query();
      const { filter_level, page, limit } = querySchema.parse(query);
  
      const { profanityWords, total } = await this.profanityListService.getProfanityList(filter_level, page, limit);
  
      const categories = await this.profanityListService.getCategories();
      const stats = await this.profanityListService.getProfanityStats();
  
      logger.info('Daftar kata-kata profanitas berhasil diambil', { total, page, limit });
      return c.json({
        status: "success",
        message: "Daftar kata-kata profanitas",
        data: {
          profanity_words: profanityWords.map(pw => ({
            id: pw.id,
            word: pw.word,
            category: pw.category.name,
            isActive: pw.isActive
          })),
          pagination: {
            total_items: total,
            total_pages: Math.ceil(total / limit),
            current_page: page,
            items_per_page: limit
          },
          categories: categories.map(c => ({ id: c.id, name: c.name })),
          stats: stats
        }
      }, 200);
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error('Kesalahan validasi', error);
        return c.json({
          status: "error",
          message: "Input tidak valid",
          errors: error.errors
        }, 400);
      }
      logger.error('Kesalahan internal server', error);
      return c.json({
        status: "error",
        message: "Terjadi kesalahan internal server"
      }, 500);
    }
  }
}