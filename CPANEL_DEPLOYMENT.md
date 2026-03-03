# Panduan Deploy Next.js (Ajnusa Website) ke cPanel

Berbeda dengan Laravel yang berjalan di atas PHP, aplikasi React/Next.js membutuhkan _environment_ **Node.js**.

Berdasarkan _screenshot_ cPanel Anda, Anda **BISA** mende-deploy Next.js karena di dalam cPanel Anda sudah tersedia fitur **"Setup Node.js App"** (ada di kategori tab _Software_).

Berikut adalah langkah-langkah _deployment_ aplikasi portal (Next.js) ke cPanel _shared hosting_:

## Tahap 1: Konfigurasi Standalone di Lokal (Komputer Anda)

Agar Next.js bisa di-mendeploy dengan mudah di cPanel laiknya aplikasi Node biasa (tanpa perlu repot mengatur PM2 eksternal), kita perlu menyuruh Next.js untuk membuat _build_ mode _Standalone_.

1. Buka file `next.config.ts` di proyek Anda.
2. Tambahkan pengaturan `output: 'standalone'` sehingga menjadi seperti ini:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone", // <--- Tambahkan baris ini
};

export default nextConfig;
```

3. Jalankan perintah kompilasi (_build_) di terminal komputer lokal Anda:

```bash
npm run build
```

Setelah proses _build_ selesai, Next.js akan membuat sebuah folder tersembunyi berformat _server_ mandiri yaitu berada di dalam path: `.next/standalone`.

## Tahap 2: Menyiapkan File untuk Diunggah ke cPanel

Kita tidak perlu mengunggah folder `node_modules` (yang ukurannya sangat besar)! Anda hanya perlu mengompres (ZIP) beberapa folder inti hasil proses _build_ di Tahap 1.

Buat folder baru di luar proyek (misalnya di Desktop dengan nama `ajnusa-cpanel`). Pindahkan file-file berikut ke folder baru tersebut:

1. Seluruh isi yang ada di dalam map `.next/standalone` (Salin _isi_-nya saja). Di dalamnya sudah otomatis terdapat file bernama `server.js`.
2. Salin folder `public/` (berisi gambar, logo, dsb) dari root proyek asli ke Root folder ZIP di langkah atas.
3. Salin folder `.next/static/` dari root proyek asli Anda. Dan letakkan masuk ke arah folder bernama `.next/static` di dalam folder ZIP yang baru dibuat.
4. Buat file konfig environment `.env.production` (berisi URL API, JWT secret portal, dll).

Struktur akhir folder/file ZIP yang harus di-upload ke cPanel:

```text
ajnusa-cpanel.zip/
 ├── .next/
 │   └── static/    <-- (Hasil copy dari .next/static/)
 ├── public/        <-- (Hasil copy public images)
 ├── server.js      <-- (Otomatis dibuat oleh standalone)
 ├── .env.production
 └── package.json   <-- (Otomatis ada dari standalone)
```

Blok/Pilih semua folder di atas, klik kanan lalu jadikan _file ZIP_ (misal `ajnusa-cpanel.zip`).

## Tahap 3: Pembuatan Aplikasi di cPanel

1. Login ke cPanel Anda (Sesuai dengan screenshot yang Anda berikan).
2. Temukan menu **Setup Node.js App** (di bagian _Software_), lalu klik **Create Application**.
3. Atur parameternya:
   - **Node.js version:** Pilih versi **18.x.x** atau **20.x.x** (disarankan 20).
   - **Application mode:** Pilih **Production**.
   - **Application root:** Ketik nama foldernya, contoh `ajnusa-app` (folder ini akan terbuat mandiri di sisi backend cPanel, disarankan jangan ditaruh di dalam `public_html`).
   - **Application URL:** Pilih domain/subdomain yang ingin Anda gunakan (misal `portal.ajnusa.com`).
   - **Application startup file:** Ketik `server.js` (Sangat Penting!).
4. Setelah itu, tekan tombol **CREATE** (Dibuat).
5. cPanel akan menyalakan server semu "virtual environment" untuk aplikasi ini. Tunda sesaat. Tombol status akan berubah menjadi RUNNING. Tekan saja dulu tombol **STOP**.

## Tahap 4: Upload File ZIP Next.js ke cPanel

1. Kembali ke Dashboard cPanel, masuk ke menu **File Manager**.
2. Masuk ke lokasi direktori _Application root_ yang barusan Anda buat (misalnya direktori bernama `ajnusa-app` tadi letaknya sejajar dengan direktori `public_html`).
3. Di dalam folder `ajnusa-app` tersebut, klik tombol **Upload**, dan unggah file `ajnusa-cpanel.zip` yang sudah Anda persiapkan di _Tahap 2_.
4. Lakukan **Extract** pada file ZIP tersebut persis di dalam folder itu.
5. (Opsional/Opsional ketat) Hapus file bernama `package.json` yang lama dan ganti/timpa dengan `package.json` hasil ekstrak Anda. Hapus `.htaccess` bawaan cPanel bila konflik.

## Tahap 5: Instalasi Akhir & Aktivasi cPanel

1. Buka kembali halaman menu **Setup Node.js App**.
2. Di baris aplikasi yang telah Anda buat tadi, klik icon "Pensil" (_Edit_).
3. Anda mungkin akan melihat peringatan `Run NPM Install` di bagian fitur pengaturan/panel bawah. Klik saja teks atau tombol **Run NPM Install** tersebut agar _Dependency Node Modules_ bawaan _standalone_ server terpasang otomatis dengan sempurna.
4. Terakhir, klik tombol hijau **START APP**!

**Selesai!** Jika sekarang Anda membuka URL / domain aplikasi Anda di peramban (browser), halaman dan fungsional Next.js portal (beserta API _route_-nya) kini sudah berfungsi di lingkungan ekosistem cPanel.
