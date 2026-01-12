# 🍵 Sistem Manajemen Pabrik Teh

Aplikasi web profesional untuk manajemen dan pelaporan operasional pabrik teh (teh hijau/teh hitam) dengan Google Spreadsheet sebagai database.

![Version](https://img.shields.io/badge/version-1.0.0-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.x-cyan)

## 🌟 Fitur Utama

- ✅ **Dashboard Interaktif** - Monitoring real-time dengan grafik dan statistik
- 📊 **Laporan Bahan Baku** - Pencatatan penerimaan bahan dari kebun
- 🔄 **Tracking Penggunaan** - Monitor penggunaan bahan per tahap produksi
- ⚖️ **Penimbangan** - Pencatatan berat dengan kalkulasi penyusutan otomatis
- 📝 **Laporan Manajerial** - Laporan harian untuk kepala pabrik
- 🔬 **Quality Control** - Pemeriksaan kualitas multi-parameter
- ⚙️ **Admin Panel** - Konfigurasi Google Spreadsheet dengan mudah
- 🎨 **Responsive Design** - Optimal untuk desktop dan tablet
- 🚀 **Offline Ready** - Mode demo tanpa koneksi internet

## 📸 Screenshot

### Dashboard
Dashboard menampilkan statistik real-time, grafik tren produksi, dan status QC.

### Form Input
Form yang user-friendly dengan validasi otomatis dan auto-calculation.

### Admin Settings
Panel admin untuk mengubah konfigurasi Google Spreadsheet dengan mudah.

## 🚀 Quick Start

### 1. Mode Demo (Instant)

```bash
# Clone repository
git clone <repository-url>

# Install dependencies
npm install

# Run development server
npm run dev
```

Login dengan akun demo:
- **Admin**: admin / admin123
- **Kepala Pabrik**: kepala / kepala123
- **Operator**: operator / operator123
- **QC**: qc / qc123

### 2. Mode Production (dengan Google Sheets)

Ikuti panduan lengkap di [DOKUMENTASI.md](./DOKUMENTASI.md)

**Ringkasan:**
1. Buat Google Spreadsheet
2. Setup Google Apps Script (copy dari `GoogleAppsScript.gs`)
3. Deploy sebagai Web App
4. Konfigurasi di Admin Settings

## 📂 Struktur Proyek

```
sistem-pabrik-teh/
├── src/
│   ├── app/
│   │   ├── App.tsx                      # Main application
│   │   ├── components/
│   │   │   ├── Login.tsx                # Login & authentication
│   │   │   ├── Dashboard.tsx            # Dashboard with charts
│   │   │   ├── BahanBakuMasuk.tsx      # Raw material input
│   │   │   ├── PenggunaanBahanBaku.tsx # Material usage
│   │   │   ├── Penimbangan.tsx         # Weighing records
│   │   │   ├── LaporanKepalaPabrik.tsx # Manager reports
│   │   │   ├── LaporanQC.tsx           # QC reports
│   │   │   └── AdminSettings.tsx       # Admin configuration
│   │   └── services/
│   │       └── googleSheets.ts          # Google Sheets API
│   └── styles/
│       └── ...                          # Tailwind CSS
├── GoogleAppsScript.gs                  # Backend script
├── DOKUMENTASI.md                       # Full documentation
├── README.md                            # This file
└── package.json
```

## 🛠️ Teknologi

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Vite** - Build tool

### Backend
- **Google Spreadsheet** - Database
- **Google Apps Script** - REST API
- **localStorage** - Configuration & session

## 📖 Dokumentasi Lengkap

Lihat [DOKUMENTASI.md](./DOKUMENTASI.md) untuk:
- Setup lengkap Google Spreadsheet
- Panduan Google Apps Script
- Struktur database
- API endpoints
- Troubleshooting
- Kustomisasi

## 🎯 Use Cases

Aplikasi ini cocok untuk:

- ✅ Pabrik teh di daerah pegunungan
- ✅ Perusahaan dengan koneksi internet terbatas
- ✅ Tim yang sudah familiar dengan Google Sheets
- ✅ Operasional yang membutuhkan tracking detail
- ✅ Implementasi cepat tanpa server kompleks

## 🔐 Role & Permissions

| Role | Dashboard | Input Data | Laporan | QC | Settings |
|------|-----------|------------|---------|----|---------| 
| **Admin** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Kepala Pabrik** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Operator** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **QC** | ✅ | ❌ | ❌ | ✅ | ❌ |

## 🔧 Kustomisasi

### Ubah Warna Tema

Edit `/src/styles/theme.css`:
```css
--color-primary: #10b981; /* Hijau → Ubah sesuai brand */
```

### Tambah Role Baru

Edit `/src/app/components/Login.tsx`:
```typescript
const DEMO_USERS = [
  { username: 'new_role', password: 'pass', role: 'new_role', name: 'Name' }
];
```

### Tambah Menu Baru

1. Buat component di `/src/app/components/`
2. Tambah route di `/src/app/App.tsx`
3. Tambah menu item di `menuItems` array

## 🐛 Troubleshooting

### Data tidak tersimpan
- ✅ Cek Apps Script sudah di-deploy
- ✅ Pastikan Spreadsheet ID benar
- ✅ Cek Web App URL valid
- ✅ Review Apps Script execution logs

### Error CORS
- ✅ Gunakan Demo Mode untuk testing
- ✅ Pastikan Apps Script setting "Anyone" access

### Grafik tidak muncul
- ✅ Pastikan ada data di spreadsheet
- ✅ Reload halaman
- ✅ Check browser console

## 📱 Browser Support

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE11 (Not supported)

## 🤝 Contributing

Aplikasi ini dibuat untuk internal use. Jika ingin berkontribusi:

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 Lisensi

Aplikasi ini bebas digunakan dan dimodifikasi untuk keperluan internal pabrik teh Anda.

## 📞 Support

Untuk pertanyaan atau masalah:
1. Baca [DOKUMENTASI.md](./DOKUMENTASI.md)
2. Check browser console untuk error
3. Review Google Apps Script logs

## 🙏 Acknowledgments

- **Google Spreadsheet** - Database solution
- **React Team** - Amazing framework
- **Tailwind Labs** - Beautiful styling
- **Recharts** - Chart library

## 📊 Status

- ✅ Version 1.0.0 - Production Ready
- ✅ Fully Functional Demo Mode
- ✅ Google Sheets Integration
- ✅ Responsive Design
- ✅ Complete Documentation

---

**Dibuat dengan ❤️ untuk Industri Pabrik Teh**

*Sistem Manajemen Pabrik Teh - Ringan, Profesional, Mudah Dikustomisasi*
