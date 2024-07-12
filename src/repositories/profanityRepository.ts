import AppDataSource from "@/config/database";
import { ProfanityWord } from "@/entities/ProfanityWord";
import { Category } from "@/entities/Category";
import { In } from "typeorm";


export class ProfanityRepository {
    private repository = AppDataSource.getRepository(ProfanityWord)
    private categoryRepository = AppDataSource.getRepository(Category)

    /**
     * Mencari kata kasar berdasarkan kata yang diberikan
     * @param word Kata yang akan dicari
     * @returns ProfanityWord jika ditemukan, null jika tidak
     */
    async findByWord(word:string): Promise<ProfanityWord | null> {
        return this.repository.findOne({ where: { word, isActive: true } });
    }

    /**
     * Mencari semua kata kasar berdasarkan tingkat filter yang diberikan
     * @param filterLevel Tingkat filter yang diinginkan
     * @returns Array dari ProfanityWord yang sesuai dengan tingkat filter
     */
    async findAllByFilterLevel(filterLevel: string): Promise<ProfanityWord[]> {
        return this.repository.find({
          where: { category: { name: filterLevel }, isActive: true },
          relations: ["category"],
        });
      }

      async findAll(): Promise<ProfanityWord[]> {
        return this.repository.find({ where: { isActive: true }, relations: ["category"] });
      }

      async findAllByFilterLevelAndBelow(filterLevel: string): Promise<ProfanityWord[]> {
        const categories = await this.getCategoriesUpToLevel(filterLevel);
        return this.repository.find({
            where: { category: { name: In(categories) }, isActive: true },
            relations: ["category"],
        });
    }

    private async getCategoriesUpToLevel(filterLevel: string): Promise<string[]> {
        const levels = ['Ringan', 'Sedang', 'Berat'];
        const levelIndex = levels.indexOf(filterLevel);
        if (levelIndex === -1) {
            throw new Error('Invalid filter level');
        }
        return levels.slice(0, levelIndex + 1);
    }
}