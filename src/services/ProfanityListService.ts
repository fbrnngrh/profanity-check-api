import { ProfanityRepository } from "../repositories/profanityRepository";

export class ProfanityListService {
  private profanityRepository: ProfanityRepository;

  constructor() {
    this.profanityRepository = new ProfanityRepository();
  }

  async getProfanityList(filterLevel: string): Promise<string[]> {
    const profanityWords = await this.profanityRepository.findAllByFilterLevel(filterLevel);
    return profanityWords.map(pw => pw.word);
  }
}