import { ProfanityRepository } from "@/repositories/profanityRepository";
import { getProfanityMessage } from "@/utils/profanityMessage";
import NodeCache from "node-cache";
import { ProfanityWord } from "@/entities/ProfanityWord";
import { levenshteinDistance } from "@/utils/stringUtils";
import { z } from "zod";
import { getWordSuggestion } from "@/utils/wordSuggestions";
import { allowedPreviousWords, allowedNextWords } from "@/utils/allowedContexts";

const checkTextSchema = z.object({
    text: z.string().min(1).max(1000),
    filterLevel: z.enum(["Ringan", "Sedang", "Berat"])
});

interface ProfanityResult {
    word: string;
    category: string;
    severity: number;
    suggestion: string;
}

export class ProfanityCheckService {
    private profanityRepository: ProfanityRepository;
    private cache: NodeCache;

    constructor(){
        this.profanityRepository = new ProfanityRepository();
        this.cache = new NodeCache({ stdTTL: 600 }); // Cache selama 10 menit
    }

    /**
     * Memeriksa teks untuk kata-kata kasar dan menyensornya.
     * @param text Teks yang akan diperiksa.
     * @param filterLevel Tingkat filter yang digunakan (ringan, sedang, berat).
     * @returns Objek yang berisi hasil pemeriksaan dan penyensoran.
     */
    async checkText(text: string, filterLevel: string): Promise<{
        contains_profanity: boolean;
        profanity_count: number;
        profanities: ProfanityResult[];
        censored_text: string;
        message: string;
        overall_severity: number;
    }> {
        const validatedInput = checkTextSchema.parse({ text, filterLevel });
        const cacheKey = `profanity_${validatedInput.filterLevel}`;
        let profanityWords = this.cache.get<ProfanityWord[]>(cacheKey);

        if (!profanityWords) {
            profanityWords = await this.profanityRepository.findAllByFilterLevelAndBelow(validatedInput.filterLevel);
            this.cache.set(cacheKey, profanityWords);
        }

        const words = validatedInput.text.split(/\s+/);
        const profanityMap = new Map(profanityWords.map(pw => [pw.word.toLowerCase(), pw.category.name]));

        const profanities: ProfanityResult[] = [];
        let profanityCount = 0;
        let totalSeverity = 0;
        const censoredWords = words.map((word, index) => {
            if (this.isProfanity(word, profanityMap)) {
                const prevWord = words[index - 1] || "";
                const nextWord = words[index + 1] || "";
                if (!this.isAllowedContext(prevWord, nextWord)) {
                    const normalizedWord = this.normalizeText(word);
                    const category = profanityMap.get(normalizedWord) || 'Unknown';
                    const severity = this.getProfanitySeverity(category);
                    const suggestion = getWordSuggestion(normalizedWord);
                    profanities.push({ word, category, severity, suggestion });
                    profanityCount++;
                    totalSeverity += severity;
                    return '*'.repeat(word.length);
                }
            }
            return word;
        });

        const overallSeverity = profanityCount > 0 ? totalSeverity / profanityCount : 0;

        const message = getProfanityMessage(profanityCount, words.length);
    
        return {
          contains_profanity: profanityCount > 0,
          profanity_count: profanityCount,
          profanities,
          censored_text: censoredWords.join(' '),
          message,
          overall_severity: overallSeverity
        };
      }

      private normalizeText(text: string): string {
        const replacements: { [key: string]: string } = {
            '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '6': 'g',
            '7': 't', '8': 'b', '9': 'g', '@': 'a', '$': 's', '!': 'i',
            '+': 't', '(': 'c', ')': 'o', '<': 'c', '>': 'o', '/': 'l',
            '\\': 'l', '|': 'i'
        };

        return text
            .toLowerCase()
            .split('')
            .map(char => replacements[char] || char)
            .join('')
            .replace(/[^a-z]/g, '');
    }

    private isProfanity(word: string, profanityMap: Map<string, string>): boolean {
        const normalizedWord = this.normalizeText(word);
        if (profanityMap.has(normalizedWord)) return true;
        
        for (const [profanity] of profanityMap) {
            if (levenshteinDistance(normalizedWord, profanity) <= 1) return true;
        }
        
        return false;
    }

    private isAllowedContext(prevWord: string, nextWord: string, caseSensitive: boolean = false): boolean {
        const checkWord = (word: string, allowedSet: Set<string>): boolean => {
            if (!caseSensitive) {
                word = word.toLowerCase();
            }
            return allowedSet.has(word) || Array.from(allowedSet).some(allowed => word.includes(allowed));
        };

        const normalizedPrev = this.normalizeText(prevWord);
        const normalizedNext = this.normalizeText(nextWord);

        return checkWord(normalizedPrev, allowedPreviousWords) || checkWord(normalizedNext, allowedNextWords);
    }
    private getProfanitySeverity(category: string): number {
      const severityMap: Record<string, number> = {
          "Ringan": 1,
          "Sedang": 2,
          "Berat": 3
      };
      return severityMap[category as keyof typeof severityMap] || 1;
  }
}