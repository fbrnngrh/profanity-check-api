/**
 * Menghitung jarak Levenshtein antara dua string.
 * 
 * Jarak Levenshtein adalah jumlah minimum operasi edit (penyisipan, penghapusan, atau substitusi)
 * yang diperlukan untuk mengubah satu string menjadi string lainnya.
 * 
 * @param a - String pertama untuk dibandingkan
 * @param b - String kedua untuk dibandingkan
 * @returns Jarak Levenshtein antara dua string
 */
export function levenshteinDistance(a: string, b: string): number {
    const matrix = [];

    // Inisialisasi baris pertama matrix
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // Inisialisasi kolom pertama matrix
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Mengisi matrix dengan nilai jarak
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                // Jika karakter sama, tidak ada operasi yang diperlukan
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                // Jika karakter berbeda, pilih operasi dengan biaya minimum
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // Substitusi
                    matrix[i][j - 1] + 1,     // Penyisipan
                    matrix[i - 1][j] + 1      // Penghapusan
                );
            }
        }
    }

    // Mengembalikan jarak Levenshtein final
    return matrix[b.length][a.length];
}