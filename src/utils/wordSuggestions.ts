export const wordSuggestions: Record<string, string> = {
    "alay": "berlebihan",
    "ampas": "kurang baik",
    "buta": "tunanetra",
    "keparat": "menyebalkan",
    "anjing": "sayang",
    "anjir": "astaga",
    "babi": "tidak sopan",
    "bacot": "banyak bicara",
    "bajingan": "orang tidak baik",
    "banci": "waria",
    "bandot": "tidak sopan",
    "buaya": "tidak setia",
    "bangkai": "jasad",
    "bangsat": "menyebalkan",
    "bego": "kurang pintar",
    "bejat": "tidak bermoral",
    "bencong": "waria",
    "berak": "buang air besar",
    "bisu": "tunawicara",
    "celeng": "tidak sopan",
    "jancuk": "menyebalkan",
    "bodoh": "kurang pintar",
    "berengsek": "menyebalkan",
    "budek": "tunarungu",
    "burik": "kurang menarik",
    "jamban": "toilet",
    "cocot": "mulut",
    "congor": "mulut",
    "culun": "kurang gaul",
    "cupu": "kurang keren",
    "dongok": "kurang pintar",
    "dungu": "kurang pintar",
    "edan": "gila",
    "tai": "kotoran",
    "ngewe": "berhubungan intim",
    "geblek": "bodoh",
    "gembel": "miskin",
    "gila": "sakit jiwa",
    "goblok": "tidak cerdas",
    "iblis": "setan",
    "idiot": "bodoh",
    "jablay": "nakal",
    "jembud": "tidak sopan",
    "jembut": "rambut kemaluan",
    "jijik": "menjijikkan",
    "kacrut": "jorok",
    "kafir": "tidak beriman",
    "modar": "mati",
    "kampang": "menyebalkan",
    "kampret": "menyebalkan",
    "kampungan": "kurang berkelas",
    "kimak": "menyebalkan",
    "kontol": "kemaluan pria",
    "kunti": "hantu",
    "tuyul": "hantu",
    "kunyuk": "nakal",
    "mampus": "mati",
    "memek": "kemaluan wanita",
    "monyet": "primata",
    "najis": "menjijikkan",
    "nete": "kencing",
    "ngentot": "berhubungan intim",
    "noob": "pemula",
    "pecun": "nakal",
    "perek": "nakal",
    "sampah": "tidak berguna",
    "sarap": "gila",
    "setan": "iblis",
    "silit": "pantat",
    "bokong": "pantat",
    "sinting": "gila",
    "sompret": "menyebalkan",
    "sontoloyo": "bodoh",
    "terkutuk": "celaka",
    "titit": "kemaluan pria",
    "pantat": "bokong",
    "tolol": "bodoh",
    "udik": "kampungan",
    "antek": "pengikut",
    "asing": "luar negeri",
    "ateis": "tidak percaya Tuhan",
    "sitip": "sipit",
    "autis": "penyandang autisme",
    "picek": "rabun",
    "ayam kampus": "pekerja seks",
    "bani kotak": "pendukung partai",
    "bispak": "nakal",
    "bisyar": "nakal",
    "bokep": "video dewasa",
    "bong": "alat hisap",
    "cacat": "difabel",
    "cct": "tidak sopan",
    "cebong": "pendukung partai",
    "taplak": "pendukung partai",
    "cungkring": "kurus",
    "gay": "homoseksual",
    "gembrot": "gemuk",
    "gendut": "gemuk",
    "hina": "rendah",
    "homo": "homoseksual",
    "komunis": "penganut komunisme",
    "koreng": "kudis",
    "krempeng": "kurus",
    "lengser": "turun tahta",
    "lesbi": "lesbian",
    "lgbt": "orientasi seksual minoritas",
    "lonte": "pekerja seks",
    "mucikari": "germo",
    "munafik": "tidak jujur",
    "ngaceng": "ereksi",
    "nista": "hina",
    "kejam": "tidak berperikemanusiaan",
    "onta": "pendukung partai",
    "panastak": "pendukung partai",
    "panasbung": "pendukung partai",
    "bani": "keturunan",
    "pasukan nasi": "pendukung bayaran",
    "porno": "dewasa",
    "seks": "hubungan intim",
    "rejim": "pemerintahan",
    "rezim": "pemerintahan",
    "sange": "terangsang",
    "serbet": "pendukung partai",
    "sipit": "bermata sipit",
    "transgender": "transeksual"
};

export function getWordSuggestion(word: string): string {
    return wordSuggestions[word.toLowerCase()] || "[kata yang lebih sopan]";
}