# Dokumentasi Sistem Manajemen Pabrik Teh

## 📋 Deskripsi
Aplikasi web profesional untuk manajemen dan pelaporan operasional pabrik teh dengan Google Spreadsheet sebagai database utama.

## ✨ Fitur Utama

### 1. Login & Autentikasi
- Login berbasis role (Admin, Kepala Pabrik, Operator, QC)
- Session management dengan localStorage
- Akun demo untuk testing

### 2. Dashboard
- Ringkasan statistik harian
- Grafik tren bahan baku & produksi
- Status QC real-time
- Info sistem dan panduan cepat

### 3. Laporan Bahan Baku Masuk
- Pencatatan penerimaan bahan dari kebun
- Filter berdasarkan tanggal dan pencarian
- Summary otomatis (total berat, kondisi, dll)

### 4. Penggunaan Bahan Baku
- Tracking penggunaan bahan per proses
- Monitoring stok tersisa
- Laporan per tahap produksi

### 5. Penimbangan
- Pencatatan penimbangan setiap tahap
- Perhitungan penyusutan otomatis
- Tracking berat awal vs akhir

### 6. Laporan Kepala Pabrik
- Laporan harian strategis
- Dokumentasi kendala & keputusan
- Format card untuk mudah dibaca

### 7. Laporan Quality Control
- Pemeriksaan kualitas per tahap
- Multi parameter QC
- Tracking hasil pemeriksaan

### 8. Pengaturan Admin
- Konfigurasi Google Spreadsheet
- Ubah link sheet dengan mudah
- Mode Demo untuk testing

## 👥 Akun Demo

| Username | Password | Role | Akses |
|----------|----------|------|-------|
| admin | admin123 | Administrator | Semua fitur + Settings |
| kepala | kepala123 | Kepala Pabrik | Dashboard, Laporan, QC |
| operator | operator123 | Operator Produksi | Dashboard, Input Data |
| qc | qc123 | Quality Control | Dashboard, Laporan QC |

## 🚀 Cara Penggunaan

### Mode Demo (Default)
1. Login dengan salah satu akun demo di atas
2. Aplikasi akan menggunakan data dummy
3. Semua fitur dapat digunakan tanpa Google Sheets

### Mode Production (dengan Google Sheets)

#### A. Setup Google Spreadsheet

1. **Buat Google Spreadsheet Baru**
   - Buka https://sheets.google.com
   - Buat spreadsheet baru dengan nama "Data Pabrik Teh"

2. **Buat Sheet dengan Struktur Berikut**

**Sheet: Bahan_Baku_Masuk**
```
| id | tanggal | asalKebun | jenisBahan | berat | kondisi | petugas |
```

**Sheet: Penggunaan_Bahan_Baku**
```
| id | tanggal | prosesProduksi | jenisBahan | jumlahDigunakan | sisaStok | keterangan |
```

**Sheet: Penimbangan**
```
| id | tanggal | tahapProduksi | beratAwal | beratAkhir | penyusutan | petugas |
```

**Sheet: Laporan_Kepala_Pabrik**
```
| id | tanggal | ringkasan | kendala | catatan |
```

**Sheet: Laporan_QC**
```
| id | tanggal | tahapProses | parameter | hasil | catatan |
```

3. **Buat Header Row**
   - Di baris pertama setiap sheet, isi dengan nama kolom seperti di atas
   - Format header: Bold, background color

#### B. Setup Google Apps Script

1. **Buka Apps Script Editor**
   - Di Google Sheets, klik **Extensions → Apps Script**
   - Hapus semua kode default

2. **Copy Script dari File**
   - Copy seluruh isi file `GoogleAppsScript.gs` (lihat bagian bawah)
   - Paste ke Apps Script editor
   - Ubah SPREADSHEET_ID jika perlu

3. **Deploy sebagai Web App**
   - Klik **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Klik **Deploy**
   - Copy **Web app URL** yang diberikan

4. **Authorize Script**
   - Saat pertama kali deploy, akan diminta authorize
   - Klik **Authorize access**
   - Pilih akun Google Anda
   - Klik **Advanced** → **Go to [Your Project]**
   - Klik **Allow**

#### C. Konfigurasi Aplikasi

1. Login sebagai **admin** (admin / admin123)
2. Buka menu **Pengaturan Admin**
3. Masukkan:
   - **Spreadsheet ID**: Copy dari URL Google Sheets
     (Contoh: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`)
   - **Script URL**: Paste Web app URL dari Apps Script
4. Klik **Simpan Konfigurasi**

#### D. Test Koneksi

1. Kembali ke menu **Bahan Baku Masuk**
2. Klik **Tambah Data**
3. Isi form dan simpan
4. Buka Google Spreadsheet
5. Cek apakah data tersimpan di sheet

## 🔧 Struktur Teknologi

### Frontend
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build**: Vite

### Backend
- **Database**: Google Spreadsheet
- **API**: Google Apps Script
- **Storage**: localStorage (untuk konfigurasi & session)

### Deployment
- **Frontend**: Dapat di-deploy ke Netlify, Vercel, atau GitHub Pages
- **Backend**: Google Apps Script (sudah cloud-hosted)

## 📂 Struktur File

```
src/
├── app/
│   ├── App.tsx                      # Main app component
│   ├── components/
│   │   ├── Login.tsx                # Login page
│   │   ├── Dashboard.tsx            # Dashboard with charts
│   │   ├── BahanBakuMasuk.tsx      # Bahan baku input
│   │   ├── PenggunaanBahanBaku.tsx # Usage tracking
│   │   ├── Penimbangan.tsx         # Weighing records
│   │   ├── LaporanKepalaPabrik.tsx # Manager reports
│   │   ├── LaporanQC.tsx           # QC reports
│   │   └── AdminSettings.tsx       # Admin configuration
│   └── services/
│       └── googleSheets.ts          # Google Sheets API service
└── styles/
    └── ...                          # Tailwind CSS styles
```

## 🔐 Keamanan

- **Session Management**: Session disimpan di localStorage
- **Role-based Access**: Menu ditampilkan sesuai role user
- **Data Validation**: Validasi input di frontend
- **Google Auth**: Apps Script menggunakan Google OAuth

## 📱 Responsiveness

Aplikasi ini dioptimalkan untuk:
- 💻 Desktop (1024px+)
- 📱 Tablet (768px - 1023px)
- 📱 Mobile (< 768px) - limited support

## 🛠️ Kustomisasi

### Mengubah Warna Tema
Edit file `/src/styles/theme.css`:
```css
/* Ubah warna primary dari hijau ke warna lain */
--color-primary: #10b981; /* Hijau - ubah sesuai keinginan */
```

### Menambah Role User Baru
Edit file `/src/app/components/Login.tsx`:
```typescript
const DEMO_USERS = [
  // ... existing users
  { username: 'supervisor', password: 'supervisor123', role: 'supervisor', name: 'Supervisor' }
];
```

### Menambah Sheet Baru
1. Buat sheet di Google Spreadsheet
2. Tambah API di `/src/app/services/googleSheets.ts`
3. Buat component baru di `/src/app/components/`
4. Tambah route di `/src/app/App.tsx`

## 🐛 Troubleshooting

### Data tidak tersimpan ke Google Sheets
1. Pastikan Apps Script sudah di-deploy dengan benar
2. Cek Web app URL sudah benar
3. Pastikan Spreadsheet ID benar
4. Cek console browser untuk error

### Error CORS
- Google Apps Script dengan mode `no-cors` tidak mengembalikan response
- Gunakan Demo Mode untuk testing
- Atau cek Apps Script execution logs

### Data tidak muncul di tabel
1. Cek console browser untuk error
2. Pastikan nama sheet sudah benar (case-sensitive)
3. Cek struktur header di Google Sheets

## 📞 Support

Untuk pertanyaan atau bantuan:
- Baca dokumentasi di atas dengan teliti
- Cek console browser untuk error messages
- Pastikan semua langkah setup sudah diikuti

## 📝 Lisensi

Aplikasi ini dibuat untuk keperluan internal pabrik teh.
Bebas digunakan dan dikustomisasi sesuai kebutuhan.

---

**Versi**: 1.0.0  
**Tanggal**: Januari 2026  
**Dibuat dengan**: React + Google Spreadsheet
