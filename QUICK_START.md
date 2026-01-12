# ⚡ Quick Start Guide

Panduan cepat untuk memulai Sistem Manajemen Pabrik Teh dalam 5 menit!

## 🎯 Mode Demo (Instant - No Setup Required)

### 1. Run Aplikasi
```bash
npm install
npm run dev
```

### 2. Login
Buka browser: `http://localhost:5173`

**Akun Demo:**
| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Administrator |
| kepala | kepala123 | Kepala Pabrik |
| operator | operator123 | Operator |
| qc | qc123 | Quality Control |

### 3. Eksplorasi
- ✅ Dashboard → Lihat statistik & grafik
- ✅ Bahan Baku Masuk → Tambah data baru
- ✅ Penimbangan → Coba auto-calculation
- ✅ Laporan QC → Input pemeriksaan
- ✅ Admin Settings → Lihat konfigurasi

**That's it!** Aplikasi sudah berjalan dengan data dummy.

---

## 🚀 Mode Production (dengan Google Sheets)

### Persiapan (5 menit)

#### 1. Buat Google Spreadsheet
- Buka https://sheets.google.com
- Buat spreadsheet baru: "Data Pabrik Teh"

#### 2. Setup Apps Script (Auto)
```javascript
// Extensions → Apps Script → Paste script dari GoogleAppsScript.gs
// Run function: setupSheets
// Authorize → Selesai!
```

#### 3. Deploy Apps Script
- Deploy → New deployment → Web app
- Execute as: **Me**
- Who has access: **Anyone**
- Copy **Web App URL** ✅

#### 4. Get Spreadsheet ID
```
https://docs.google.com/spreadsheets/d/ABC123.../edit
                                        ^^^^^^^ (Copy ini)
```

### Konfigurasi (1 menit)

1. Login sebagai **admin**
2. Buka **Pengaturan Admin**
3. Input:
   - Spreadsheet ID: `ABC123...`
   - Script URL: `https://script.google.com/...`
4. **Simpan Konfigurasi** ✅

### Test (30 detik)

1. Menu **Bahan Baku Masuk**
2. **Tambah Data** → Isi form → **Simpan**
3. Buka Google Spreadsheet
4. Data muncul? ✅ **SUCCESS!**

---

## 📦 Deploy ke Production

### Vercel (Recommended)
```bash
npm install -g vercel
vercel login
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Manual Build
```bash
npm run build
# Upload folder 'dist' ke hosting
```

---

## 🔧 Common Issues

### Data tidak tersimpan
```
✅ Cek Apps Script sudah di-deploy?
✅ Web App URL benar?
✅ Spreadsheet ID benar?
```

### Chart tidak muncul
```
✅ Refresh page (Ctrl + R)
✅ Ada data di spreadsheet?
✅ Check browser console
```

### Login tidak bisa
```
✅ Clear browser cache
✅ Cek console untuk error
✅ Gunakan akun demo di atas
```

---

## 📚 Dokumentasi Lengkap

- **DOKUMENTASI.md** - Setup detail & troubleshooting
- **DEPLOYMENT.md** - Production deployment guide
- **TEMPLATE_SPREADSHEET.md** - Struktur database
- **GoogleAppsScript.gs** - Backend code

---

## 💡 Tips

### Untuk Testing
- Gunakan Demo Mode (default)
- Tambah/edit/hapus data sesuka hati
- Data dummy tidak akan hilang

### Untuk Production
- ⚠️ Ganti password default!
- 💾 Backup spreadsheet rutin
- 🔒 Proteksi header row di sheets
- 📊 Monitor Apps Script quota

### Untuk Kustomisasi
- 🎨 Ubah warna: `/src/styles/theme.css`
- 👥 Tambah role: `/src/app/components/Login.tsx`
- 📋 Tambah menu: `/src/app/App.tsx`

---

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Refresh page | Ctrl + R |
| Hard refresh | Ctrl + Shift + R |
| Open console | F12 |
| Close modal | Esc |

---

## 🎯 Next Steps

Setelah berhasil setup:

1. ✅ Test semua fitur
2. ✅ Training team
3. ✅ Ganti password
4. ✅ Setup backup schedule
5. ✅ Go live! 🎉

---

## 📞 Need Help?

1. Baca **DOKUMENTASI.md** (comprehensive)
2. Check **Troubleshooting** section
3. Review browser console errors
4. Check Apps Script logs

---

## 🎁 Bonus

### Script untuk Import Data CSV

```javascript
// Paste di Apps Script editor
function importCSV() {
  // Your CSV import logic here
}
```

### Template Excel/CSV

Download template dari `TEMPLATE_SPREADSHEET.md`

---

**Total Setup Time:**
- Demo Mode: **< 2 minutes** ⚡
- Production Mode: **< 10 minutes** 🚀

**Selamat mencoba!** 🍵

---

*Sistem Manajemen Pabrik Teh v1.0.0*
