// Google Sheets Integration Service
// Handles all API calls to Google Apps Script backend

export interface SheetConfig {
  spreadsheetId: string;
  scriptUrl: string;
}

// Get current Google Sheets configuration
export const getSheetConfig = (): SheetConfig => {
  const savedConfig = localStorage.getItem('sheetConfig');
  if (savedConfig) {
    return JSON.parse(savedConfig);
  }
  
  // Default configuration (demo mode)
  return {
    spreadsheetId: 'DEMO_MODE',
    scriptUrl: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
  };
};

// Update Google Sheets configuration (Admin only)
export const updateSheetConfig = (config: SheetConfig): void => {
  localStorage.setItem('sheetConfig', JSON.stringify(config));
};

// Generic function to call Google Apps Script
export const callGoogleScript = async (action: string, data: any = {}) => {
  const config = getSheetConfig();
  
  // Demo mode - return mock data
  if (config.spreadsheetId === 'DEMO_MODE') {
    return getDemoData(action, data);
  }
  
  try {
    const response = await fetch(config.scriptUrl, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        ...data
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error calling Google Script:', error);
    throw error;
  }
};

// Demo data for testing without Google Sheets
const getDemoData = (action: string, data: any) => {
  console.log('DEMO MODE:', action, data);
  
  switch (action) {
    case 'getData':
      return getDemoDataBySheet(data.sheet);
    case 'addData':
      return { success: true, message: 'Data berhasil ditambahkan (Demo Mode)' };
    case 'updateData':
      return { success: true, message: 'Data berhasil diupdate (Demo Mode)' };
    case 'deleteData':
      return { success: true, message: 'Data berhasil dihapus (Demo Mode)' };
    case 'getDashboardStats':
      return getDemoDashboardStats();
    default:
      return { success: true, data: [] };
  }
};

const getDemoDataBySheet = (sheetName: string) => {
  const today = new Date().toISOString().split('T')[0];
  
  switch (sheetName) {
    case 'Bahan_Baku_Masuk':
      return {
        success: true,
        data: [
          {
            id: '1',
            tanggal: today,
            asalKebun: 'Kebun Gunung Mas',
            jenisBahan: 'Teh Hijau',
            berat: '500',
            kondisi: 'Baik',
            petugas: 'Budi Santoso'
          },
          {
            id: '2',
            tanggal: today,
            asalKebun: 'Kebun Ciwidey',
            jenisBahan: 'Teh Hitam',
            berat: '450',
            kondisi: 'Baik',
            petugas: 'Siti Aminah'
          }
        ]
      };
    
    case 'Penggunaan_Bahan_Baku':
      return {
        success: true,
        data: [
          {
            id: '1',
            tanggal: today,
            prosesProduksi: 'Pengeringan',
            jenisBahan: 'Teh Hijau',
            jumlahDigunakan: '250',
            sisaStok: '250',
            keterangan: 'Normal'
          }
        ]
      };
    
    case 'Penimbangan':
      return {
        success: true,
        data: [
          {
            id: '1',
            tanggal: today,
            tahapProduksi: 'Pelayuan',
            beratAwal: '500',
            beratAkhir: '475',
            penyusutan: '25',
            petugas: 'Ahmad Hidayat'
          }
        ]
      };
    
    case 'Laporan_Kepala_Pabrik':
      return {
        success: true,
        data: [
          {
            id: '1',
            tanggal: today,
            ringkasan: 'Produksi berjalan lancar, target harian tercapai 95%',
            kendala: 'Cuaca hujan menghambat pengeringan',
            catatan: 'Perlu tambahan kapasitas pengeringan indoor'
          }
        ]
      };
    
    case 'Laporan_QC':
      return {
        success: true,
        data: [
          {
            id: '1',
            tanggal: today,
            tahapProses: 'Pengeringan',
            parameter: 'Kadar Air',
            hasil: '3.5%',
            catatan: 'Sesuai standar (< 4%)'
          },
          {
            id: '2',
            tanggal: today,
            tahapProses: 'Fermentasi',
            parameter: 'Warna',
            hasil: 'Coklat Kemerahan',
            catatan: 'Optimal'
          }
        ]
      };
    
    default:
      return { success: true, data: [] };
  }
};

const getDemoDashboardStats = () => {
  return {
    success: true,
    stats: {
      totalBahanMasuk: 950,
      totalBahanDigunakan: 250,
      totalPenimbangan: 12,
      statusQC: 'Baik',
      chartData: {
        labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
        bahanMasuk: [450, 520, 380, 610, 490, 550, 420],
        produksi: [420, 490, 360, 580, 470, 520, 400]
      }
    }
  };
};

// API Functions for each sheet
export const bahanBakuAPI = {
  getAll: () => callGoogleScript('getData', { sheet: 'Bahan_Baku_Masuk' }),
  add: (data: any) => callGoogleScript('addData', { sheet: 'Bahan_Baku_Masuk', data }),
  update: (id: string, data: any) => callGoogleScript('updateData', { sheet: 'Bahan_Baku_Masuk', id, data }),
  delete: (id: string) => callGoogleScript('deleteData', { sheet: 'Bahan_Baku_Masuk', id }),
};

export const penggunaanBahanAPI = {
  getAll: () => callGoogleScript('getData', { sheet: 'Penggunaan_Bahan_Baku' }),
  add: (data: any) => callGoogleScript('addData', { sheet: 'Penggunaan_Bahan_Baku', data }),
  update: (id: string, data: any) => callGoogleScript('updateData', { sheet: 'Penggunaan_Bahan_Baku', id, data }),
  delete: (id: string) => callGoogleScript('deleteData', { sheet: 'Penggunaan_Bahan_Baku', id }),
};

export const penimbanganAPI = {
  getAll: () => callGoogleScript('getData', { sheet: 'Penimbangan' }),
  add: (data: any) => callGoogleScript('addData', { sheet: 'Penimbangan', data }),
  update: (id: string, data: any) => callGoogleScript('updateData', { sheet: 'Penimbangan', id, data }),
  delete: (id: string) => callGoogleScript('deleteData', { sheet: 'Penimbangan', id }),
};

export const laporanKepalaPabrikAPI = {
  getAll: () => callGoogleScript('getData', { sheet: 'Laporan_Kepala_Pabrik' }),
  add: (data: any) => callGoogleScript('addData', { sheet: 'Laporan_Kepala_Pabrik', data }),
  update: (id: string, data: any) => callGoogleScript('updateData', { sheet: 'Laporan_Kepala_Pabrik', id, data }),
  delete: (id: string) => callGoogleScript('deleteData', { sheet: 'Laporan_Kepala_Pabrik', id }),
};

export const laporanQCAPI = {
  getAll: () => callGoogleScript('getData', { sheet: 'Laporan_QC' }),
  add: (data: any) => callGoogleScript('addData', { sheet: 'Laporan_QC', data }),
  update: (id: string, data: any) => callGoogleScript('updateData', { sheet: 'Laporan_QC', id, data }),
  delete: (id: string) => callGoogleScript('deleteData', { sheet: 'Laporan_QC', id }),
};

export const dashboardAPI = {
  getStats: () => callGoogleScript('getDashboardStats'),
};
