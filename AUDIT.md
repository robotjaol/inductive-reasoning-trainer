# Audit logika alur penilaian

Perbaikan mencakup koneksi katalog/bookmark, transisi latihan katalog,
pengulangan sesi, timer berbasis tenggat, submit idempoten, statistik ujian
tanpa hitungan ganda, shortcut yang tidak aktif di dialog/halaman lain,
pembahasan per soal, stimulus hasil review, dan validasi penyimpanan lokal.

Generator memeriksa sidik isi soal, mengabaikan nomor, judul, serta urutan
opsi. Jika template berulang, generator menggunakan ruang 4096 kombinasi
jumlah titik dan relasi untuk kategori tersebut. Parameter berpengaruh pada
contoh dan jawaban, bukan sekadar label. Setiap sesi dibatasi 1–1000 soal.
Aturan dasar bisa sama; jaminan anti-pengulangan berlaku dalam satu sesi,
bukan seluruh sesi sepanjang waktu. Label kesulitan belum dikalibrasi
secara psikometrik.

Pemeriksaan diperketat: perubahan distraktor, urutan contoh kelompok,
urutan properti data, ID, judul, dan huruf jawaban tidak menjadikan soal
baru. Urutan deret dan pasangan analogi tetap dipertahankan karena bermakna.
Sebelum mengembalikan set, generator memeriksa ulang jumlah yang diminta
dan seluruh sidik isi; set duplikat tidak boleh memulai sesi.

Kapasitas fallback per kategori adalah 8^4 = 4096 isi berbeda. Untuk
klasifikasi/aturan/odd-one-out, tiga jumlah hitam yang meningkat
a, a+b, a+b+c mengidentifikasi a, b, c secara unik; selisih warna
mengidentifikasi parameter keempat. Untuk analogi, pasangan awal dan
perubahannya menentukan empat parameter; untuk deret, dua titik awal
dan dua selisih menentukan empat parameter. Langkah 2053 relatif prima
terhadap 4096 sehingga penelusuran fallback mengunjungi seluruh kode
tanpa mengulang kode sebelum satu siklus selesai. Kapasitas tersebut
melebihi batas 1000, termasuk ketika hanya satu kategori dipilih.

Gambar diperbaiki untuk penanda rotasi, poligon tujuh sisi, sektor persegi,
dan susunan titik rapat. Soal identifikasi aturan kini memiliki bukti visual.
Analitik per kategori menggunakan riwayat jawaban aktual.

Sesuai instruksi pengguna, tes otomatis, build, dan tes browser tidak
dijalankan. Hasil ini merupakan pemeriksaan dan perbaikan logika sumber,
bukan sertifikasi bebas bug atau validasi psikometrik.
