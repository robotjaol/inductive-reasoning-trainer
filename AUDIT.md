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

Gambar diperbaiki untuk penanda rotasi, poligon tujuh sisi, sektor persegi,
dan susunan titik rapat. Soal identifikasi aturan kini memiliki bukti visual.
Analitik per kategori menggunakan riwayat jawaban aktual.

Sesuai instruksi pengguna, tes otomatis, build, dan tes browser tidak
dijalankan. Hasil ini merupakan pemeriksaan dan perbaikan logika sumber,
bukan sertifikasi bebas bug atau validasi psikometrik.
