# Daftar Tugas Proyek

## TODO

### Seeder

- [x] Buat seeder untuk mengisi database dengan data dari training_data.csv
- [x] import data dari training_data.csv ke database

### Controllers

- [x] Buat controller untuk setiap endpoint API:
  - [x] `src/controllers/checkController.ts`
    - [x] Implementasi endpoint POST `/check`
    - [x] Validasi input (text dan filter_level)
    - [x] Integrasi dengan service untuk pengecekan profanity
    - [x] Format respons sesuai spesifikasi API
  - [x] `src/controllers/profanityListController.ts`
    - [x] Implementasi endpoint GET `/profanity-list`
    - [x] Validasi query parameter (filter_level)
    - [x] Integrasi dengan service untuk mengambil daftar kata kasar
  - [x] `src/controllers/userController.ts`
    - [x] Implementasi manajemen pengguna (jika diperlukan)

### Services

- [x] Buat service untuk logika bisnis:
  - [x] `src/services/profanityCheckService.ts`
    - [x] Implementasi fungsi untuk memeriksa teks
    - [x] Implementasi fungsi untuk menyensor kata-kata kasar
    - [x] Implementasi fungsi untuk menghitung jumlah kata kasar
  - [x] `src/services/profanityListService.ts`
    - [x] Implementasi fungsi untuk mengambil daftar kata kasar berdasarkan filter level


### Repositories

- [x] Buat repository untuk setiap entitas:
  - [x] `src/repositories/profanityRepository.ts`
  - [x] `src/repositories/userRepository.ts`
  - [ ] `src/repositories/categoryRepository.ts`
  - [ ] `src/repositories/checkLogRepository.ts`
  - [ ] `src/repositories/customProfanityWordRepository.ts`
  - [ ] `src/repositories/wordVariationRepository.ts`


### Middleware

- [ ] Implementasi middleware autentikasi untuk memeriksa API key
- [ ] Implementasi middleware rate limiting (100 request per menit per API key)

### Routes

- [ ] Definisikan routes untuk setiap endpoint di `src/routes/index.ts`

### Validasi

- [ ] Implementasi validasi input menggunakan Zod untuk setiap endpoint

### Error Handling

- [ ] Buat custom error handler untuk menangani berbagai jenis error (400, 401, 429, 500)

### Database

- [ ] Konfigurasi koneksi database MySQL
- [ ] Buat migrasi untuk tabel-tabel yang diperlukan

### Testing

- [ ] Tulis unit test untuk setiap controller dan service
- [ ] Tulis integration test untuk setiap endpoint

### Dokumentasi

- [ ] Buat dokumentasi API menggunakan Swagger atau tools serupa
- [ ] Tulis README.md dengan instruksi instalasi dan penggunaan

### Deployment

- [ ] Siapkan skrip deployment
- [ ] Konfigurasi environment variables untuk production

### Monitoring dan Logging

- [ ] Implementasi sistem logging
- [ ] Siapkan monitoring untuk performa API

### Keamanan

- [ ] Implementasi HTTPS
- [ ] Terapkan best practices keamanan (sanitasi input, proteksi terhadap injeksi SQL, dll.)

### Optimisasi

- [ ] Optimisasi query database
- [ ] Implementasi caching jika diperlukan
