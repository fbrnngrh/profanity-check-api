import AppDataSource from "../config/database"
import { ProfanityWord } from "../entities/ProfanityWord";
import { Category } from "../entities/Category";
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

async function seedProfanityWords() {
  await AppDataSource.initialize();

  const categoryRepository = AppDataSource.getRepository(Category);
  const profanityRepository = AppDataSource.getRepository(ProfanityWord);

  // Buat kategori default
  const categories = [
    { name: 'Ringan', description: 'Kata-kata kasar tingkat ringan' },
    { name: 'Sedang', description: 'Kata-kata kasar tingkat sedang' },
    { name: 'Berat', description: 'Kata-kata kasar tingkat berat' }
  ];

  for (const cat of categories) {
    let category = await categoryRepository.findOne({ where: { name: cat.name } });
    if (!category) {
      category = categoryRepository.create(cat);
      await categoryRepository.save(category);
    }
  }

  // Baca file CSV
  const csvFilePath = path.resolve(__dirname, '../../training_data.csv');
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  // Parse CSV
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });

  // Fungsi untuk menentukan kategori berdasarkan panjang kata
  function determineCategory(word: string): string {
    if (word.length <= 4) return 'Ringan';
    if (word.length <= 6) return 'Sedang';
    return 'Berat';
  }

  // Masukkan data ke database
  for (const record of records) {
    const word = record.ABUSIVE.toLowerCase().trim();
    const existingWord = await profanityRepository.findOne({ where: { word } });
    if (!existingWord) {
      const categoryName = determineCategory(word);
      const category = await categoryRepository.findOne({ where: { name: categoryName } });
      
      if (category) {
        const profanityWord = profanityRepository.create({
          word,
          category: category,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        await profanityRepository.save(profanityWord);
      } else {
        console.warn(`Kategori '${categoryName}' tidak ditemukan untuk kata '${word}'`);
      }
    }
  }

  console.log('Seeding completed');
  await AppDataSource.destroy();
}

seedProfanityWords().catch(error => console.error('Error seeding data:', error));