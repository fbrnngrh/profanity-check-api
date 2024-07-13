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
          order: { word: "ASC" }
        });
    }

    /**
     * Mencari semua kata kasar yang aktif
     * @returns Array dari semua ProfanityWord yang aktif
     */
    async findAll(): Promise<ProfanityWord[]> {
        return this.repository.find({ where: { isActive: true }, relations: ["category"] });
    }

    /**
     * Mencari semua kata kasar berdasarkan tingkat filter dan level di bawahnya
     * @param filterLevel Tingkat filter tertinggi yang diinginkan
     * @returns Array dari ProfanityWord yang sesuai dengan tingkat filter dan di bawahnya
     */
    async findAllByFilterLevelAndBelow(filterLevel: string): Promise<ProfanityWord[]> {
        const categories = await this.getCategoriesUpToLevel(filterLevel);
        return this.repository.find({
            where: { category: { name: In(categories) }, isActive: true },
            relations: ["category"],
            order: { category: { id: "ASC" }}
        });
    }

    /**
     * Mendapatkan daftar kategori sampai level tertentu
     * @param filterLevel Level filter yang diinginkan
     * @returns Array dari nama kategori sampai level yang ditentukan
     * @throws Error jika level filter tidak valid
     */
    private async getCategoriesUpToLevel(filterLevel: string): Promise<string[]> {
        const levels = ['Ringan', 'Sedang', 'Berat'];
        const levelIndex = levels.indexOf(filterLevel);
        if (levelIndex === -1) {
            throw new Error('Invalid filter level');
        }
        return levels.slice(0, levelIndex + 1);
    }

    /**
     * Mendapatkan semua kategori
     * @returns Array dari semua Category, diurutkan berdasarkan nama
     */
    async getCategories(): Promise<Category[]> {
        return this.categoryRepository.find({ order: { name: "ASC" } });
    }

    /**
     * Menghitung jumlah kata kasar per kategori
     * @returns Objek dengan nama kategori sebagai kunci dan jumlah kata sebagai nilai
     */
    async countProfanityWords(): Promise<{ [key: string]: number }> {
        const result = await this.repository
            .createQueryBuilder("profanityWord")
            .select("category.name", "category")
            .addSelect("COUNT(*)", "count")
            .leftJoin("profanityWord.category", "category")
            .where("profanityWord.isActive = :isActive", { isActive: true })
            .groupBy("category.name")
            .getRawMany();

        return result.reduce((acc, curr) => {
            acc[curr.category] = parseInt(curr.count);
            return acc;
        }, {} as { [key: string]: number });
    }
}