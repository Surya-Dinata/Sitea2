/**
 * Google Apps Script untuk Sistem Manajemen Pabrik Teh
 * 
 * CARA PENGGUNAAN:
 * 1. Copy seluruh script ini ke Google Apps Script editor
 * 2. Deploy sebagai Web App dengan akses "Anyone"
 * 3. Copy URL deployment ke aplikasi frontend
 * 
 * STRUKTUR SPREADSHEET:
 * Buat sheet dengan nama berikut:
 * - Bahan_Baku_Masuk
 * - Penggunaan_Bahan_Baku
 * - Penimbangan
 * - Laporan_Kepala_Pabrik
 * - Laporan_QC
 */

// Handler untuk POST request
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    Logger.log('Received action: ' + action);
    
    switch(action) {
      case 'getData':
        return getData(data.sheet);
      case 'addData':
        return addData(data.sheet, data.data);
      case 'updateData':
        return updateData(data.sheet, data.id, data.data);
      case 'deleteData':
        return deleteData(data.sheet, data.id);
      case 'getDashboardStats':
        return getDashboardStats();
      default:
        return createResponse(false, 'Unknown action: ' + action);
    }
  } catch(error) {
    Logger.log('Error: ' + error.toString());
    return createResponse(false, 'Error: ' + error.toString());
  }
}

// Handler untuk GET request (optional, untuk testing)
function doGet(e) {
  return createResponse(true, 'Google Apps Script is running!', {
    timestamp: new Date().toISOString(),
    message: 'Use POST method to interact with this API'
  });
}

// Get all data from a sheet
function getData(sheetName) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return createResponse(false, 'Sheet not found: ' + sheetName);
    }
    
    const lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      // No data, only headers
      return createResponse(true, 'Success', []);
    }
    
    const data = sheet.getRange(1, 1, lastRow, sheet.getLastColumn()).getValues();
    const headers = data[0];
    
    // Convert to JSON array
    const rows = [];
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const obj = { id: i.toString() };
      
      for (let j = 0; j < headers.length; j++) {
        const header = headers[j];
        let value = row[j];
        
        // Format dates
        if (value instanceof Date) {
          value = Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
        }
        
        obj[header] = value;
      }
      
      rows.push(obj);
    }
    
    return createResponse(true, 'Success', rows);
  } catch(error) {
    return createResponse(false, 'Error getting data: ' + error.toString());
  }
}

// Add new data to a sheet
function addData(sheetName, data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return createResponse(false, 'Sheet not found: ' + sheetName);
    }
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const values = [];
    
    // Match data with headers
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      values.push(data[header] || '');
    }
    
    // Append row
    sheet.appendRow(values);
    
    return createResponse(true, 'Data added successfully');
  } catch(error) {
    return createResponse(false, 'Error adding data: ' + error.toString());
  }
}

// Update existing data in a sheet
function updateData(sheetName, id, data) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return createResponse(false, 'Sheet not found: ' + sheetName);
    }
    
    const rowNumber = parseInt(id) + 1; // +1 because of header row
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Update each cell
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      if (data.hasOwnProperty(header)) {
        sheet.getRange(rowNumber, i + 1).setValue(data[header]);
      }
    }
    
    return createResponse(true, 'Data updated successfully');
  } catch(error) {
    return createResponse(false, 'Error updating data: ' + error.toString());
  }
}

// Delete data from a sheet
function deleteData(sheetName, id) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return createResponse(false, 'Sheet not found: ' + sheetName);
    }
    
    const rowNumber = parseInt(id) + 1; // +1 because of header row
    sheet.deleteRow(rowNumber);
    
    return createResponse(true, 'Data deleted successfully');
  } catch(error) {
    return createResponse(false, 'Error deleting data: ' + error.toString());
  }
}

// Get dashboard statistics
function getDashboardStats() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get data from sheets
    const bahanMasukSheet = ss.getSheetByName('Bahan_Baku_Masuk');
    const penggunaanSheet = ss.getSheetByName('Penggunaan_Bahan_Baku');
    const penimbanganSheet = ss.getSheetByName('Penimbangan');
    const qcSheet = ss.getSheetByName('Laporan_QC');
    
    // Calculate stats
    const stats = {
      totalBahanMasuk: calculateTotal(bahanMasukSheet, 'berat'),
      totalBahanDigunakan: calculateTotal(penggunaanSheet, 'jumlahDigunakan'),
      totalPenimbangan: (penimbanganSheet.getLastRow() - 1) || 0,
      statusQC: getQCStatus(qcSheet),
      chartData: generateChartData()
    };
    
    return createResponse(true, 'Success', stats);
  } catch(error) {
    return createResponse(false, 'Error getting stats: ' + error.toString());
  }
}

// Helper: Calculate total from a column
function calculateTotal(sheet, columnName) {
  try {
    if (!sheet || sheet.getLastRow() < 2) return 0;
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const columnIndex = headers.indexOf(columnName);
    
    if (columnIndex === -1) return 0;
    
    const data = sheet.getRange(2, columnIndex + 1, sheet.getLastRow() - 1, 1).getValues();
    let total = 0;
    
    for (let i = 0; i < data.length; i++) {
      const value = parseFloat(data[i][0]);
      if (!isNaN(value)) {
        total += value;
      }
    }
    
    return Math.round(total);
  } catch(error) {
    return 0;
  }
}

// Helper: Get QC status
function getQCStatus(sheet) {
  try {
    if (!sheet || sheet.getLastRow() < 2) return 'Belum Ada Data';
    
    const lastRow = sheet.getLastRow();
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const catatanIndex = headers.indexOf('catatan');
    
    if (catatanIndex === -1) return 'Baik';
    
    const lastCatatan = sheet.getRange(lastRow, catatanIndex + 1).getValue().toString().toLowerCase();
    
    if (lastCatatan.includes('tidak') || lastCatatan.includes('buruk')) {
      return 'Perlu Perhatian';
    }
    
    return 'Baik';
  } catch(error) {
    return 'Baik';
  }
}

// Helper: Generate chart data (last 7 days)
function generateChartData() {
  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const bahanMasuk = [];
  const produksi = [];
  
  // Generate random data for demo (replace with actual calculations)
  for (let i = 0; i < 7; i++) {
    bahanMasuk.push(Math.floor(Math.random() * 300) + 350);
    produksi.push(Math.floor(Math.random() * 250) + 300);
  }
  
  return {
    labels: days,
    bahanMasuk: bahanMasuk,
    produksi: produksi
  };
}

// Helper: Create JSON response
function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message
  };
  
  if (data !== null) {
    if (success && !message.includes('Error')) {
      response.data = data;
    } else {
      response.stats = data;
    }
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * TESTING FUNCTIONS
 * Uncomment untuk testing manual di Apps Script editor
 */

// Test getData
function testGetData() {
  const result = getData('Bahan_Baku_Masuk');
  Logger.log(result.getContent());
}

// Test addData
function testAddData() {
  const data = {
    tanggal: '2026-01-06',
    asalKebun: 'Test Kebun',
    jenisBahan: 'Teh Hijau',
    berat: '100',
    kondisi: 'Baik',
    petugas: 'Test User'
  };
  const result = addData('Bahan_Baku_Masuk', data);
  Logger.log(result.getContent());
}

// Test getDashboardStats
function testGetStats() {
  const result = getDashboardStats();
  Logger.log(result.getContent());
}

/**
 * SETUP HELPER
 * Run this function to create all required sheets with headers
 */
function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Define sheets and their headers
  const sheetsConfig = {
    'Bahan_Baku_Masuk': ['tanggal', 'asalKebun', 'jenisBahan', 'berat', 'kondisi', 'petugas'],
    'Penggunaan_Bahan_Baku': ['tanggal', 'prosesProduksi', 'jenisBahan', 'jumlahDigunakan', 'sisaStok', 'keterangan'],
    'Penimbangan': ['tanggal', 'tahapProduksi', 'beratAwal', 'beratAkhir', 'penyusutan', 'petugas'],
    'Laporan_Kepala_Pabrik': ['tanggal', 'ringkasan', 'kendala', 'catatan'],
    'Laporan_QC': ['tanggal', 'tahapProses', 'parameter', 'hasil', 'catatan']
  };
  
  // Create sheets
  for (const sheetName in sheetsConfig) {
    let sheet = ss.getSheetByName(sheetName);
    
    // Create sheet if doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      Logger.log('Created sheet: ' + sheetName);
    }
    
    // Set headers
    const headers = sheetsConfig[sheetName];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4CAF50');
    headerRange.setFontColor('#FFFFFF');
    
    // Auto-resize columns
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }
  }
  
  Logger.log('Setup complete! All sheets created with headers.');
}
