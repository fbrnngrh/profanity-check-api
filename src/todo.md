# Daftar Tugas Proyek

## TODO

### Controllers

- [ ] Buat controller untuk setiap endpoint API:
  - [ ] `src/controllers/checkController.ts`
    - [ ] Implementasi endpoint POST `/check`
    - [ ] Validasi input (text dan filter_level)
    - [ ] Integrasi dengan service untuk pengecekan profanity
    - [ ] Format respons sesuai spesifikasi API
  - [ ] `src/controllers/profanityListController.ts`
    - [ ] Implementasi endpoint GET `/profanity-list`
    - [ ] Validasi query parameter (filter_level)
    - [ ] Integrasi dengan service untuk mengambil daftar kata kasar
  - [ ] `src/controllers/userController.ts`
    - [ ] Implementasi manajemen pengguna (jika diperlukan)

### Services

- [ ] Buat service untuk logika bisnis:
  - [ ] `src/services/profanityCheckService.ts`
    - [ ] Implementasi fungsi untuk memeriksa teks
    - [ ] Implementasi fungsi untuk menyensor kata-kata kasar
    - [ ] Implementasi fungsi untuk menghitung jumlah kata kasar
  - [ ] `src/services/profanityListService.ts`
    - [ ] Implementasi fungsi untuk mengambil daftar kata kasar berdasarkan filter level


### Repositories

- [ ] Buat repository untuk setiap entitas:
  - [ ] `src/repositories/profanityRepository.ts`
  - [ ] `src/repositories/userRepository.ts`
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
