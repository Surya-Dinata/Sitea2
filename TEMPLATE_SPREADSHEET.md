# Template Google Spreadsheet

## Panduan Membuat Spreadsheet

### Cara 1: Manual (Recommended)

1. Buka https://sheets.google.com
2. Klik "Blank" untuk membuat spreadsheet baru
3. Rename spreadsheet: "Data Pabrik Teh"
4. Buat 5 sheet dengan struktur di bawah

### Cara 2: Copy Template

Anda bisa copy template yang sudah jadi (jika tersedia) atau buat manual mengikuti struktur di bawah.

---

## Sheet 1: Bahan_Baku_Masuk

**Struktur Kolom:**

| tanggal | asalKebun | jenisBahan | berat | kondisi | petugas |
|---------|-----------|------------|-------|---------|---------|

**Contoh Data:**

| tanggal | asalKebun | jenisBahan | berat | kondisi | petugas |
|---------|-----------|------------|-------|---------|---------|
| 2026-01-06 | Kebun Gunung Mas | Teh Hijau | 500 | Baik | Budi Santoso |
| 2026-01-06 | Kebun Ciwidey | Teh Hitam | 450 | Baik | Siti Aminah |
| 2026-01-05 | Kebun Puncak | Teh Hijau | 380 | Cukup | Ahmad Hidayat |

**Keterangan:**
- `tanggal`: Format YYYY-MM-DD
- `asalKebun`: Nama kebun asal
- `jenisBahan`: Teh Hijau / Teh Hitam / Teh Oolong / Teh Putih
- `berat`: Dalam kilogram (angka)
- `kondisi`: Baik / Cukup / Kurang Baik
- `petugas`: Nama petugas penerima

---

## Sheet 2: Penggunaan_Bahan_Baku

**Struktur Kolom:**

| tanggal | prosesProduksi | jenisBahan | jumlahDigunakan | sisaStok | keterangan |
|---------|----------------|------------|-----------------|----------|------------|

**Contoh Data:**

| tanggal | prosesProduksi | jenisBahan | jumlahDigunakan | sisaStok | keterangan |
|---------|----------------|------------|-----------------|----------|------------|
| 2026-01-06 | Pelayuan | Teh Hijau | 250 | 250 | Normal |
| 2026-01-06 | Pengeringan | Teh Hijau | 200 | 50 | Proses lancar |
| 2026-01-05 | Fermentasi | Teh Hitam | 300 | 150 | Optimal |

**Keterangan:**
- `tanggal`: Format YYYY-MM-DD
- `prosesProduksi`: Pelayuan / Penggulungan / Fermentasi / Pengeringan / Sortasi / Pengemasan
- `jenisBahan`: Teh Hijau / Teh Hitam / Teh Oolong / Teh Putih
- `jumlahDigunakan`: Dalam kilogram (angka)
- `sisaStok`: Dalam kilogram (angka)
- `keterangan`: Catatan tambahan

---

## Sheet 3: Penimbangan

**Struktur Kolom:**

| tanggal | tahapProduksi | beratAwal | beratAkhir | penyusutan | petugas |
|---------|---------------|-----------|------------|------------|---------|

**Contoh Data:**

| tanggal | tahapProduksi | beratAwal | beratAkhir | penyusutan | petugas |
|---------|---------------|-----------|------------|------------|---------|
| 2026-01-06 | Pelayuan | 500 | 475 | 25 | Ahmad Hidayat |
| 2026-01-06 | Pengeringan | 475 | 380 | 95 | Budi Santoso |
| 2026-01-05 | Fermentasi | 450 | 440 | 10 | Siti Aminah |

**Keterangan:**
- `tanggal`: Format YYYY-MM-DD
- `tahapProduksi`: Pelayuan / Penggulungan / Fermentasi / Pengeringan / Sortasi / Pengemasan
- `beratAwal`: Dalam kilogram (angka)
- `beratAkhir`: Dalam kilogram (angka)
- `penyusutan`: Dalam kilogram (angka) - Otomatis dihitung di aplikasi
- `petugas`: Nama petugas penimbang

---

## Sheet 4: Laporan_Kepala_Pabrik

**Struktur Kolom:**

| tanggal | ringkasan | kendala | catatan |
|---------|-----------|---------|---------|

**Contoh Data:**

| tanggal | ringkasan | kendala | catatan |
|---------|-----------|---------|---------|
| 2026-01-06 | Produksi berjalan lancar, target harian tercapai 95%. Total produksi 380kg teh kering. | Cuaca hujan menghambat pengeringan, perlu tambahan waktu 2 jam. | Perlu tambahan kapasitas pengeringan indoor untuk antisipasi musim hujan. |
| 2026-01-05 | Target produksi tercapai 100%. Kualitas output sangat baik. | Tidak ada kendala berarti. | Pertahankan standar operasional yang sama. |

**Keterangan:**
- `tanggal`: Format YYYY-MM-DD
- `ringkasan`: Ringkasan produksi hari ini (text panjang)
- `kendala`: Kendala yang dihadapi (text panjang)
- `catatan`: Catatan keputusan dan rencana (text panjang)

---

## Sheet 5: Laporan_QC

**Struktur Kolom:**

| tanggal | tahapProses | parameter | hasil | catatan |
|---------|-------------|-----------|-------|---------|

**Contoh Data:**

| tanggal | tahapProses | parameter | hasil | catatan |
|---------|-------------|-----------|-------|---------|
| 2026-01-06 | Pengeringan | Kadar Air | 3.5% | Sesuai standar (< 4%) |
| 2026-01-06 | Fermentasi | Warna | Coklat Kemerahan | Optimal |
| 2026-01-06 | Sortasi | Kebersihan | Baik | Tidak ditemukan kontaminan |
| 2026-01-05 | Pelayuan | Aroma | Harum Segar | Kualitas premium |

**Keterangan:**
- `tanggal`: Format YYYY-MM-DD
- `tahapProses`: Pelayuan / Penggulungan / Fermentasi / Pengeringan / Sortasi / Pengemasan
- `parameter`: Kadar Air / Warna / Aroma / Tekstur / Ukuran / Kebersihan / pH / Suhu
- `hasil`: Hasil pemeriksaan (text)
- `catatan`: Catatan QC dan rekomendasi (text)

---

## Format & Styling Tips

### Header Row (Baris 1)
- Font: **Bold**
- Background: **#4CAF50** (Hijau)
- Text Color: **#FFFFFF** (Putih)
- Alignment: Center

### Data Rows
- Font: Regular
- Background: Putih (atau alternate dengan #F5F5F5 untuk zebra striping)
- Text Color: #000000
- Alignment: Left

### Kolom Tanggal
- Format: `YYYY-MM-DD` atau `DD/MM/YYYY`
- Gunakan Format > Number > Date

### Kolom Angka (Berat, Jumlah)
- Format: Number dengan 2 desimal
- Contoh: 500.00

### Data Validation (Optional)

**Untuk kolom `jenisBahan`:**
```
Teh Hijau
Teh Hitam
Teh Oolong
Teh Putih
```

**Untuk kolom `kondisi`:**
```
Baik
Cukup
Kurang Baik
```

**Untuk kolom `prosesProduksi` / `tahapProduksi`:**
```
Pelayuan
Penggulungan
Fermentasi
Pengeringan
Sortasi
Pengemasan
```

**Untuk kolom `parameter`:**
```
Kadar Air
Warna
Aroma
Tekstur
Ukuran
Kebersihan
pH
Suhu
```

---

## Setup Cepat dengan Apps Script

Setelah membuat spreadsheet, jalankan fungsi `setupSheets()` di Apps Script untuk otomatis membuat semua sheet dengan header yang benar.

**Langkah:**
1. Copy script dari `GoogleAppsScript.gs`
2. Paste ke Apps Script editor
3. Run function: `setupSheets`
4. Authorize script
5. Semua sheet akan dibuat otomatis!

---

## Tips Penggunaan

### 1. Backup Rutin
- File > Download > Excel (.xlsx)
- Simpan backup mingguan/bulanan

### 2. Proteksi Header
- Klik kanan pada baris 1
- "Protect row" untuk mencegah perubahan header

### 3. Conditional Formatting (Optional)

**Kondisi Baik = Hijau:**
```
Format > Conditional formatting
Apply to range: E2:E1000 (kolom kondisi)
Format cells if: Text contains "Baik"
Color: Light green
```

**Kondisi Kurang Baik = Merah:**
```
Format > Conditional formatting
Apply to range: E2:E1000
Format cells if: Text contains "Kurang"
Color: Light red
```

### 4. Auto-resize Columns
- Select all columns
- Right click > Resize columns > Fit to data

### 5. Freeze Header
- Click pada cell A2
- View > Freeze > 1 row

---

## Contoh Spreadsheet URL

Setelah setup, URL spreadsheet Anda akan seperti:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
```

**Spreadsheet ID** (untuk konfigurasi):
```
1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
```

---

## Troubleshooting

### Sheet tidak terbaca
- ✅ Pastikan nama sheet **EXACT** (case-sensitive)
- ✅ Tidak ada spasi extra di nama sheet
- ✅ Nama sheet sesuai dengan yang di kode

### Data tidak muncul
- ✅ Pastikan header di baris 1
- ✅ Nama kolom sesuai (case-sensitive)
- ✅ Tidak ada kolom kosong di tengah

### Error saat update
- ✅ Pastikan data type sesuai (tanggal, angka, text)
- ✅ Format tanggal konsisten
- ✅ Angka tidak mengandung karakter non-numeric

---

**Template ini siap digunakan untuk Sistem Manajemen Pabrik Teh!** 🍵
