# 🚀 Panduan Deployment

Panduan lengkap untuk deploy aplikasi Sistem Manajemen Pabrik Teh ke production.

## 📋 Persiapan

### Requirements
- ✅ Node.js 18+ terinstall
- ✅ Akun Google (untuk Google Sheets & Apps Script)
- ✅ Git terinstall
- ✅ Text editor (VS Code recommended)

---

## 🔧 Setup Lokal

### 1. Clone & Install

```bash
# Clone repository
git clone <your-repository-url>
cd sistem-pabrik-teh

# Install dependencies
npm install

# Run development server
npm run dev
```

Buka browser: `http://localhost:5173`

### 2. Test dengan Demo Mode

Login dengan akun demo:
- Username: `admin`
- Password: `admin123`

Pastikan semua fitur berjalan dengan baik.

---

## 📊 Setup Google Spreadsheet

### 1. Buat Spreadsheet

1. Buka https://sheets.google.com
2. Klik "Blank" untuk spreadsheet baru
3. Rename: "Data Pabrik Teh [Production]"

### 2. Setup Sheets dengan Script

**Option A: Otomatis (Recommended)**

1. Di Google Sheets, klik `Extensions` → `Apps Script`
2. Hapus kode default
3. Copy seluruh isi file `GoogleAppsScript.gs`
4. Paste ke editor
5. Save dengan nama "PabrikTehAPI"
6. Run function: `setupSheets`
7. Authorize script saat diminta
8. Cek spreadsheet - semua sheet sudah dibuat!

**Option B: Manual**

Buat 5 sheet dengan nama dan header sesuai `TEMPLATE_SPREADSHEET.md`:
- Bahan_Baku_Masuk
- Penggunaan_Bahan_Baku
- Penimbangan
- Laporan_Kepala_Pabrik
- Laporan_QC

### 3. Deploy Apps Script sebagai Web App

1. Di Apps Script editor, klik `Deploy` → `New deployment`
2. Settings:
   - **Type**: Web app
   - **Description**: Production API v1
   - **Execute as**: Me
   - **Who has access**: Anyone
3. Klik `Deploy`
4. **PENTING**: Copy **Web app URL** yang diberikan
   - Format: `https://script.google.com/macros/s/AKfyc.../exec`

### 4. Get Spreadsheet ID

Dari URL Google Sheets:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5n.../edit
                                        ^^^^^^^^^^^^^^^^^
                                        Ini Spreadsheet ID
```

---

## 🌐 Deploy ke Vercel (Recommended)

### 1. Persiapan

```bash
# Build untuk production
npm run build

# Test build locally
npm run preview
```

### 2. Deploy via Vercel CLI

```bash
# Install Vercel CLI (sekali saja)
npm install -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel
```

Ikuti instruksi:
- Project name: `sistem-pabrik-teh`
- Settings: Gunakan default

### 3. Deploy via Vercel Dashboard

1. Push code ke GitHub
2. Buka https://vercel.com
3. Login dengan GitHub
4. Click `New Project`
5. Import repository Anda
6. Settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click `Deploy`

### 4. Custom Domain (Optional)

Di Vercel Dashboard:
1. Settings → Domains
2. Add domain Anda
3. Update DNS sesuai instruksi

---

## 🔥 Deploy ke Netlify

### 1. Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### 2. Via Netlify Dashboard

1. Push code ke GitHub
2. Buka https://netlify.com
3. Click `New site from Git`
4. Connect GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click `Deploy site`

---

## 📦 Deploy ke GitHub Pages

### 1. Update vite.config.ts

```typescript
// vite.config.ts
export default defineConfig({
  base: '/sistem-pabrik-teh/', // Nama repository Anda
  // ... rest of config
})
```

### 2. Build & Deploy

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

### 3. Enable GitHub Pages

1. Repository → Settings → Pages
2. Source: gh-pages branch
3. Save

Akses: `https://yourusername.github.io/sistem-pabrik-teh`

---

## 🔗 Konfigurasi Production

### 1. Login sebagai Admin

- URL: `https://your-deployed-url.com`
- Username: `admin`
- Password: `admin123`

### 2. Buka Admin Settings

Menu → Pengaturan Admin

### 3. Input Konfigurasi

**Spreadsheet ID:**
```
1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
```
(Sesuaikan dengan ID Anda)

**Google Apps Script URL:**
```
https://script.google.com/macros/s/AKfyc.../exec
```
(Dari Apps Script deployment)

### 4. Save & Test

1. Click `Simpan Konfigurasi`
2. Buka menu `Bahan Baku Masuk`
3. Tambah data test
4. Cek Google Spreadsheet
5. Jika data muncul = ✅ Berhasil!

---

## 🔐 Keamanan Production

### 1. Ganti Password Default

**PENTING**: Ganti password default sebelum production!

Edit `/src/app/components/Login.tsx`:

```typescript
const DEMO_USERS = [
  { 
    username: 'admin', 
    password: 'PASSWORD_BARU_YANG_KUAT', // ⬅️ GANTI INI
    role: 'admin', 
    name: 'Administrator' 
  },
  // ... ganti juga yang lain
];
```

### 2. Environment Variables (Advanced)

Untuk keamanan lebih baik, gunakan environment variables:

**.env.production:**
```
VITE_SHEET_ID=your_spreadsheet_id
VITE_SCRIPT_URL=your_script_url
```

Update kode untuk baca dari env variables.

### 3. Google Apps Script Security

1. Jangan share Web App URL ke public
2. Backup script secara berkala
3. Review Apps Script execution logs

---

## 📱 Setup untuk Mobile Access

### 1. PWA (Progressive Web App)

Aplikasi sudah responsive, tapi bisa ditambah PWA:

1. Create `manifest.json`
2. Add service worker
3. Update index.html

### 2. Add to Home Screen

Di mobile browser:
1. Buka aplikasi
2. Menu → Add to Home Screen
3. Aplikasi jadi seperti native app

---

## 🔄 Update & Maintenance

### Update Code

```bash
# Pull latest changes
git pull origin main

# Build
npm run build

# Redeploy (Vercel auto-deploys, atau manual)
vercel --prod
```

### Update Apps Script

1. Edit di Apps Script editor
2. Save
3. Deploy → Manage deployments
4. Click ✏️ (Edit) pada deployment aktif
5. Version: New version
6. Deploy

**PENTING**: URL tidak berubah, tidak perlu update config!

### Database Maintenance

**Backup Google Sheets:**
- File → Download → Excel (.xlsx)
- Simpan dengan nama: `backup_YYYYMMDD.xlsx`
- Lakukan backup rutin (mingguan/bulanan)

**Clean Old Data:**
- Archive data lama ke sheet terpisah
- Atau download & hapus dari sheet aktif

---

## 📊 Monitoring

### Google Apps Script Logs

1. Apps Script editor
2. Executions (icon di sidebar)
3. Monitor success/failure rate

### Application Logs

Check browser console untuk errors:
- Chrome: F12 → Console
- Firefox: F12 → Console

### Analytics (Optional)

Tambahkan Google Analytics:

1. Create GA4 property
2. Add tracking code ke `index.html`

---

## 🆘 Troubleshooting Production

### Apps Script tidak respond

**Check:**
- ✅ Script deployed dengan benar?
- ✅ Execution quota tidak exceed?
- ✅ URL masih valid?

**Solution:**
- Redeploy dengan version baru
- Check quota di Google Cloud Console

### Data tidak sync

**Check:**
- ✅ Internet connection
- ✅ Browser console errors
- ✅ Apps Script execution logs

**Solution:**
- Hard refresh (Ctrl + Shift + R)
- Clear browser cache
- Re-save config di Admin Settings

### Slow Performance

**Check:**
- ✅ Spreadsheet size (< 10,000 rows recommended)
- ✅ Network speed
- ✅ Browser cache

**Solution:**
- Archive old data
- Optimize sheet (remove unused formulas)
- Use CDN for assets

---

## 📈 Scaling

### Banyak User Concurrent

**Google Apps Script Quotas:**
- Free: 20,000 URL Fetch calls/day
- Workspace: 100,000 calls/day

**Solutions jika exceed:**
1. Upgrade ke Google Workspace
2. Implement caching
3. Batch operations

### Banyak Data

**Jika spreadsheet penuh:**
1. Archive data lama
2. Split ke multiple spreadsheets (per bulan/tahun)
3. Atau migrate ke database proper (PostgreSQL, etc)

---

## ✅ Checklist Deployment

Sebelum go-live, pastikan:

- [ ] Build production berjalan tanpa error
- [ ] All features tested di demo mode
- [ ] Google Spreadsheet setup complete
- [ ] Apps Script deployed & tested
- [ ] Config production tersimpan
- [ ] Password default sudah diganti
- [ ] Backup spreadsheet dibuat
- [ ] Team training selesai
- [ ] Dokumentasi dibaca
- [ ] Support contact tersedia

---

## 🎉 Go Live!

Setelah semua checklist ✅:

1. **Announce** ke team
2. **Share** URL production
3. **Monitor** usage hari pertama
4. **Support** users jika ada kendala
5. **Collect** feedback untuk improvement

---

## 📞 Support

Jika ada masalah setelah deployment:

1. Cek dokumentasi (DOKUMENTASI.md)
2. Review troubleshooting guide
3. Check Apps Script logs
4. Clear cache & retry

---

**Selamat! Aplikasi Anda sudah Production Ready!** 🎊

*Sistem Manajemen Pabrik Teh - Ringan, Cepat, Handal*
