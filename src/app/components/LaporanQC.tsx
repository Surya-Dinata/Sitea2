import { useState, useEffect } from 'react';
import { User } from '../App';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { laporanQCAPI } from '../services/googleSheets';

interface LaporanQC {
  id: string;
  tanggal: string;
  tahapProses: string;
  parameter: string;
  hasil: string;
  catatan: string;
}

interface LaporanQCProps {
  user: User;
}

export function LaporanQC({ user }: LaporanQCProps) {
  const [data, setData] = useState<LaporanQC[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  
  const [formData, setFormData] = useState<Partial<LaporanQC>>({
    tanggal: new Date().toISOString().split('T')[0],
    tahapProses: 'Pelayuan',
    parameter: 'Kadar Air',
    hasil: '',
    catatan: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await laporanQCAPI.getAll();
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await laporanQCAPI.update(editingId, formData);
      } else {
        await laporanQCAPI.add(formData);
      }
      
      setShowForm(false);
      setEditingId(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleEdit = (item: LaporanQC) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await laporanQCAPI.delete(id);
        loadData();
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      tanggal: new Date().toISOString().split('T')[0],
      tahapProses: 'Pelayuan',
      parameter: 'Kadar Air',
      hasil: '',
      catatan: ''
    });
  };

  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.tahapProses.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.parameter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hasil.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !filterDate || item.tanggal === filterDate;
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Laporan Quality Control (QC)</h2>
          <p className="text-gray-600 mt-1">Pemeriksaan kualitas pada setiap tahap produksi</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            resetForm();
          }}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5" />
          Tambah Pemeriksaan
        </button>
      </div>

      {/* Search & Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari tahap, parameter, atau hasil..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingId ? 'Edit Pemeriksaan' : 'Tambah Pemeriksaan Baru'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Pemeriksaan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tahap Proses <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.tahapProses}
                    onChange={(e) => setFormData({ ...formData, tahapProses: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="Pelayuan">Pelayuan</option>
                    <option value="Penggulungan">Penggulungan</option>
                    <option value="Fermentasi">Fermentasi</option>
                    <option value="Pengeringan">Pengeringan</option>
                    <option value="Sortasi">Sortasi</option>
                    <option value="Pengemasan">Pengemasan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parameter Kualitas <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.parameter}
                    onChange={(e) => setFormData({ ...formData, parameter: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="Kadar Air">Kadar Air</option>
                    <option value="Warna">Warna</option>
                    <option value="Aroma">Aroma</option>
                    <option value="Tekstur">Tekstur</option>
                    <option value="Ukuran">Ukuran</option>
                    <option value="Kebersihan">Kebersihan</option>
                    <option value="pH">pH</option>
                    <option value="Suhu">Suhu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hasil Pemeriksaan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.hasil}
                    onChange={(e) => setFormData({ ...formData, hasil: e.target.value })}
                    placeholder="Contoh: 3.5% atau Baik"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catatan QC <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.catatan}
                  onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  placeholder="Catatan tambahan, rekomendasi, atau keterangan lainnya..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  {editingId ? 'Update Data' : 'Simpan Data'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Data Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahap Proses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hasil</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catatan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Tidak ada data. Klik "Tambah Pemeriksaan" untuk menambahkan data baru.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(item.tanggal).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.tahapProses}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.parameter}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{item.hasil}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.catatan}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      {filteredData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Total Pemeriksaan</p>
            <p className="text-2xl font-bold text-gray-800">{filteredData.length}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Parameter Berbeda</p>
            <p className="text-2xl font-bold text-green-600">
              {new Set(filteredData.map(item => item.parameter)).size}
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Tahap Diperiksa</p>
            <p className="text-2xl font-bold text-blue-600">
              {new Set(filteredData.map(item => item.tahapProses)).size}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
