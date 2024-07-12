interface ProfanityMessage {
    message: string;
    emoji: string;
  }
  
  const profanityMessages: ProfanityMessage[] = [
    { message: "Hei, ayo kita jaga bahasa kita ya!", emoji: "😊" },
    { message: "Ups, ada kata yang kurang sopan nih.", emoji: "😯" },
    { message: "Wah, bahasanya perlu diperhalus sedikit.", emoji: "😬" },
    { message: "Hmm, mungkin bisa pilih kata yang lebih baik?", emoji: "🤔" },
    { message: "Ayo kita gunakan kata-kata yang lebih positif!", emoji: "😃" },
  ];
  
  const severeProfanityMessages: ProfanityMessage[] = [
    { message: "Wow, itu kata-kata yang sangat kasar!", emoji: "😱" },
    { message: "Astaga! Bahasanya terlalu ekstrem!", emoji: "🚨" },
    { message: "Oh tidak! Kata-kata itu sangat tidak pantas!", emoji: "🙈" },
    { message: "Hei, kita perlu menjaga kesopanan di sini!", emoji: "⚠️" },
    { message: "Whoa! Itu bahasa yang sangat kasar!", emoji: "💢" },
  ];
  
  const cleanMessages: ProfanityMessage[] = [
    { message: "Bagus! Bahasamu sangat sopan.", emoji: "👍" },
    { message: "Luar biasa! Kamu menggunakan bahasa yang baik.", emoji: "🌟" },
    { message: "Hebat! Tidak ada kata kasar terdeteksi.", emoji: "🎉" },
    { message: "Keren! Kamu menjaga kesopanan dalam berbahasa.", emoji: "😎" },
    { message: "Excellent! Bahasamu sangat terjaga.", emoji: "🏆" },
  ];
  
  /**
   * Menghasilkan pesan berdasarkan jumlah kata kasar yang ditemukan dalam teks.
   * 
   * @param profanityCount - Jumlah kata kasar yang ditemukan dalam teks.
   * @param totalWords - Total jumlah kata dalam teks.
   * @returns Pesan yang sesuai dengan tingkat kekasaran bahasa yang terdeteksi.
   * 
   * Fungsi ini akan mengembalikan:
   * - Pesan positif jika tidak ada kata kasar (profanityCount = 0).
   * - Pesan peringatan ringan jika ada sedikit kata kasar.
   * - Pesan peringatan keras jika jumlah atau rasio kata kasar tinggi.
   * 
   * Pesan yang dihasilkan akan disertai dengan emoji yang sesuai.
   */
  export function getProfanityMessage(profanityCount: number, totalWords: number): string {
    let message: ProfanityMessage;
    
    if (profanityCount === 0) {
      message = cleanMessages[Math.floor(Math.random() * cleanMessages.length)];
      return `${message.emoji} ${message.message} ${message.emoji}`;
    }
  
    const profanityRatio = profanityCount / totalWords;
    
    if (profanityRatio > 0.3 || profanityCount > 3) {
      message = severeProfanityMessages[Math.floor(Math.random() * severeProfanityMessages.length)];
      return `${message.emoji}${message.emoji} ${message.message.toUpperCase()}!! ${message.emoji}${message.emoji}`;
    } else {
      message = profanityMessages[Math.floor(Math.random() * profanityMessages.length)];
      return `${message.emoji} ${message.message} Ditemukan ${profanityCount} kata yang perlu diperhatikan. ${message.emoji}`;
    }
  }