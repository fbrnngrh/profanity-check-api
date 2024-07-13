import { ProfanityRepository } from "../repositories/profanityRepository";
import { ProfanityWord } from "@/entities/ProfanityWord";
import { Category } from "@/entities/Category";
import NodeCache from "node-cache";

type FilterLevel = "Ringan" | "Sedang" | "Berat";

export class ProfanityListService {
  private profanityRepository: ProfanityRepository;
  private cache: NodeCache;

  constructor() {
    this.profanityRepository = new ProfanityRepository();
    this.cache = new NodeCache({ stdTTL: 600 }); // Cache selama 10 menit
  }

  /**
   * Mengambil daftar kata profanitas berdasarkan tingkat filter.
   * @param filterLevel Tingkat filter yang diinginkan.
   * @returns Promise yang menghasilkan array ProfanityWord.
   * @throws Error jika terjadi kesalahan saat mengambil data.
   */
  async getProfanityList(filterLevel: FilterLevel): Promise<ProfanityWord[]> {
    const cacheKey = `profanity_list_${filterLevel}`;
    let profanityWords = this.cache.get<ProfanityWord[]>(cacheKey);

    if (!profanityWords) {
      try {
        profanityWords = await this.profanityRepository.findAllByFilterLevel(filterLevel);
        this.cache.set(cacheKey, profanityWords);
      } catch (error) {
        console.error(`Error fetching profanity list: ${error}`);
        throw new Error("Gagal mengambil daftar kata profanitas");
      }
    }

    return profanityWords;
  }

  /**
   * Mengambil daftar kategori profanitas.
   * @returns Promise yang menghasilkan array Category.
   * @throws Error jika terjadi kesalahan saat mengambil data.
   */
  async getCategories(): Promise<Category[]> {
    const cacheKey = 'profanity_categories';
    let categories = this.cache.get<Category[]>(cacheKey);

    if (!categories) {
      try {
        categories = await this.profanityRepository.getCategories();
        this.cache.set(cacheKey, categories);
      } catch (error) {
        console.error(`Error fetching categories: ${error}`);
        throw new Error("Gagal mengambil daftar kategori");
      }
    }

    return categories;
  }

  /**
   * Mengambil statistik jumlah kata profanitas per kategori.
   * @returns Promise yang menghasilkan objek dengan jumlah kata per kategori.
   * @throws Error jika terjadi kesalahan saat mengambil data.
   */
  async getProfanityStats(): Promise<{ [key: string]: number }> {
    const cacheKey = 'profanity_stats';
    let stats = this.cache.get<{ [key: string]: number }>(cacheKey);

    if (!stats) {
      try {
        stats = await this.profanityRepository.countProfanityWords();
        this.cache.set(cacheKey, stats);
      } catch (error) {
        console.error(`Error fetching profanity stats: ${error}`);
        throw new Error("Gagal mengambil statistik kata profanitas");
      }
    }

    return stats;
  }
}