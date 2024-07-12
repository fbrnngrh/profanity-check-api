import  AppDataSource  from "../config/database";
import { User } from "../entities/User";

export class UserRepository {
  private repository = AppDataSource.getRepository(User);

  async findByApiKey(apiKey: string): Promise<User | null> {
    return this.repository.findOne({ where: { apiKey } });
  }
}