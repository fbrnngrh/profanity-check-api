import AppDataSource from "@/config/database";
import { ProfanityWord } from "@/entities/ProfanityWord";


export class ProfanityRepository {
    private repository = AppDataSource.getRepository(ProfanityWord)

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
}