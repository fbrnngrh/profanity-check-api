import { ProfanityRepository } from "@/repositories/profanityRepository";

/**
 * Layanan untuk memeriksa dan menyensor kata-kata kasar dalam teks.
 */
export class ProfanityCheckService {
    private profanityRepository: ProfanityRepository;

    /**
     * Membuat instance baru dari ProfanityService.
     */
    constructor(){
        this.profanityRepository = new ProfanityRepository();
    }

    /**
     * Memeriksa teks untuk kata-kata kasar dan menyensornya.
     * @param text Teks yang akan diperiksa.
     * @param filterLevel Tingkat filter yang digunakan (ringan, sedang, berat).
     * @returns Objek yang berisi hasil pemeriksaan dan penyensoran.
     */
    async checkText(text: string, filterLevel: string): Promise<{
        containsProfanity: boolean;
        profanityCount: number;
        profanities: string[];
        censoredText: string;
      }> {
        const words = text.toLowerCase().split(/\s+/);
        const profanityWords = await this.profanityRepository.findAllByFilterLevel(filterLevel);
        const profanitySet = new Set(profanityWords.map(pw => pw.word));
    
        const profanities: string[] = [];
        let profanityCount = 0;
        const censoredWords = words.map(word => {
          if (profanitySet.has(word)) {
            profanities.push(word);
            profanityCount++;
            return '*'.repeat(word.length);
          }
          return word;
        });
    
        return {
          containsProfanity: profanityCount > 0,
          profanityCount,
          profanities,
          censoredText: censoredWords.join(' '),
        };
      }
}