import { useState, useEffect } from 'react';
import { Settings, Save, AlertCircle, CheckCircle, Info, ExternalLink, FileText } from 'lucide-react';
import { getSheetConfig, updateSheetConfig } from '../services/googleSheets';

export function AdminSettings() {
  const [config, setConfig] = useState({
    spreadsheetId: '',
    scriptUrl: ''
  });
  const [saved, setSaved] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);

  useEffect(() => {
    const currentConfig = getSheetConfig();
    setConfig(currentConfig);
    setIsDemoMode(currentConfig.spreadsheetId === 'DEMO_MODE');
  }, []);

  const handleSave = () => {
    updateSheetConfig(config);
    setSaved(true);
    setIsDemoMode(config.spreadsheetId === 'DEMO_MODE');
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSetDemo = () => {
    setConfig({
      spreadsheetId: 'DEMO_MODE',
      scriptUrl: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <Settings className="w-7 h-7" />
          Pengaturan Admin
        </h2>
        <p className="text-gray-600 mt-1">Konfigurasi Google Spreadsheet dan API</p>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Informasi Penting:</p>
            <p>Halaman ini hanya dapat diakses oleh Administrator. Ubah konfigurasi di bawah untuk menghubungkan aplikasi dengan Google Spreadsheet Anda.</p>
          </div>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Koneksi</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Mode Operasi:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              isDemoMode 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {isDemoMode ? 'Demo Mode' : 'Production Mode'}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Spreadsheet ID:</span>
            <span className="text-sm font-mono text-gray-800">
              {config.spreadsheetId || 'Belum diatur'}
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Status:</span>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 font-semibold">Terhubung</span>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Konfigurasi Google Spreadsheet</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spreadsheet ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={config.spreadsheetId}
              onChange={(e) => setConfig({ ...config, spreadsheetId: e.target.value })}
              placeholder="Contoh: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              ID Spreadsheet dapat ditemukan di URL Google Sheets (setelah /d/)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Apps Script URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={config.scriptUrl}
              onChange={(e) => setConfig({ ...config, scriptUrl: e.target.value })}
              placeholder="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              URL endpoint dari Google Apps Script yang sudah di-deploy
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md"
            >
              <Save className="w-5 h-5" />
              Simpan Konfigurasi
            </button>
            
            <button
              onClick={handleSetDemo}
              className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold shadow-md"
            >
              Gunakan Demo Mode
            </button>
          </div>

          {saved && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Konfigurasi berhasil disimpan!</span>
            </div>
          )}
        </div>
      </div>

      {/* Documentation */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Dokumentasi Setup
        </h3>
        
        <div className="prose prose-sm max-w-none">
          <h4 className="font-semibold text-gray-800 mb-2">Langkah-langkah Setup:</h4>
          
          <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
            <li>
              <strong>Buat Google Spreadsheet baru</strong>
              <ul className="ml-6 mt-1 space-y-1 list-disc list-inside">
                <li>Buka Google Sheets dan buat spreadsheet baru</li>
                <li>Buat sheet dengan nama: Bahan_Baku_Masuk, Penggunaan_Bahan_Baku, Penimbangan, Laporan_Kepala_Pabrik, Laporan_QC</li>
              </ul>
            </li>
            
            <li>
              <strong>Setup Google Apps Script</strong>
              <ul className="ml-6 mt-1 space-y-1 list-disc list-inside">
                <li>Di Google Sheets, klik Extensions → Apps Script</li>
                <li>Copy script yang telah disediakan (lihat file Apps_Script.gs dalam dokumentasi)</li>
                <li>Deploy sebagai Web App dengan akses "Anyone"</li>
              </ul>
            </li>
            
            <li>
              <strong>Salin URL dan ID</strong>
              <ul className="ml-6 mt-1 space-y-1 list-disc list-inside">
                <li>Salin Spreadsheet ID dari URL Google Sheets</li>
                <li>Salin Web App URL dari Apps Script deployment</li>
                <li>Masukkan kedua nilai tersebut di form di atas</li>
              </ul>
            </li>
            
            <li>
              <strong>Test Koneksi</strong>
              <ul className="ml-6 mt-1 space-y-1 list-disc list-inside">
                <li>Simpan konfigurasi</li>
                <li>Coba tambahkan data di salah satu menu</li>
                <li>Cek Google Spreadsheet untuk memastikan data tersimpan</li>
              </ul>
            </li>
          </ol>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold">Catatan Penting:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Pastikan Apps Script sudah di-deploy dengan benar</li>
                  <li>Spreadsheet harus dapat diakses oleh script</li>
                  <li>Gunakan Demo Mode untuk testing tanpa Google Sheets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Script */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contoh Google Apps Script</h3>
        
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-xs"><code>{`// Google Apps Script untuk Sistem Pabrik Teh
// File: Code.gs

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    // Routing berdasarkan action
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
        return response(false, 'Unknown action');
    }
  } catch(error) {
    return response(false, error.toString());
  }
}

function getData(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  
  // Convert to JSON
  const headers = data[0];
  const rows = data.slice(1).map((row, index) => {
    let obj = { id: (index + 1).toString() };
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
  
  return response(true, 'Success', rows);
}

function addData(sheetName, data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  
  // Add row
  const values = Object.values(data);
  sheet.appendRow(values);
  
  return response(true, 'Data added successfully');
}

function response(success, message, data = null) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: success,
      message: message,
      data: data
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Tambahkan fungsi updateData, deleteData, dan getDashboardStats
// sesuai kebutuhan aplikasi Anda`}</code></pre>
        </div>
        
        <div className="mt-4">
          <a
            href="https://script.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Buka Google Apps Script
          </a>
        </div>
      </div>
    </div>
  );
}
