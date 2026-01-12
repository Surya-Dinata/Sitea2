import { useState, useEffect } from 'react';
import { User } from '../App';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { bahanBakuAPI } from '../services/googleSheets';

interface BahanBaku {
  id: string;
  tanggal: string;
  asalKebun: string;
  jenisBahan: string;
  berat: string;
  kondisi: string;
  petugas: string;
}

interface BahanBakuMasukProps {
  user: User;
}

export function BahanBakuMasuk({ user }: BahanBakuMasukProps) {
  const [data, setData] = useState<BahanBaku[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  
  const [formData, setFormData] = useState<Partial<BahanBaku>>({
    tanggal: new Date().toISOString().split('T')[0],
    asalKebun: '',
    jenisBahan: 'Teh Hijau',
    berat: '',
    kondisi: 'Baik',
    petugas: user.name
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await bahanBakuAPI.getAll();
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
        await bahanBakuAPI.update(editingId, formData);
      } else {
        await bahanBakuAPI.add(formData);
      }
      
      setShowForm(false);
      setEditingId(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleEdit = (item: BahanBaku) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await bahanBakuAPI.delete(id);
        loadData();
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      tanggal: new Date().toISOString().split('T')[0],
      asalKebun: '',
      jenisBahan: 'Teh Hijau',
      berat: '',
      kondisi: 'Baik',
      petugas: user.name
    });
  };

  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.asalKebun.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jenisBahan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.petugas.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !filterDate || item.tanggal === filterDate;
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Laporan Bahan Baku Masuk</h2>
          <p className="text-gray-600 mt-1">Pencatatan penerimaan bahan baku dari kebun</p>
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
          Tambah Data
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
            placeholder="Cari kebun, jenis bahan, atau petugas..."
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
                {editingId ? 'Edit Data' : 'Tambah Data Baru'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal <span className="text-red-500">*</span>
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
                    Asal Kebun <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.asalKebun}
                    onChange={(e) => setFormData({ ...formData, asalKebun: e.target.value })}
                    placeholder="Contoh: Kebun Gunung Mas"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Bahan <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.jenisBahan}
                    onChange={(e) => setFormData({ ...formData, jenisBahan: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="Teh Hijau">Teh Hijau</option>
                    <option value="Teh Hitam">Teh Hitam</option>
                    <option value="Teh Oolong">Teh Oolong</option>
                    <option value="Teh Putih">Teh Putih</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Berat (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.berat}
                    onChange={(e) => setFormData({ ...formData, berat: e.target.value })}
                    placeholder="0"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kondisi <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.kondisi}
                    onChange={(e) => setFormData({ ...formData, kondisi: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    required
                  >
                    <option value="Baik">Baik</option>
                    <option value="Cukup">Cukup</option>
                    <option value="Kurang Baik">Kurang Baik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Petugas Penerima <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.petugas}
                    onChange={(e) => setFormData({ ...formData, petugas: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asal Kebun</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Bahan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Berat (kg)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kondisi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Petugas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Tidak ada data. Klik "Tambah Data" untuk menambahkan data baru.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(item.tanggal).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.asalKebun}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.jenisBahan}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{item.berat}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.kondisi === 'Baik' ? 'bg-green-100 text-green-800' :
                          item.kondisi === 'Cukup' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.kondisi}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.petugas}</td>
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

      {/* Summary */}
      {filteredData.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Total Data</p>
              <p className="text-2xl font-bold text-gray-800">{filteredData.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Berat</p>
              <p className="text-2xl font-bold text-gray-800">
                {filteredData.reduce((sum, item) => sum + parseFloat(item.berat || '0'), 0).toFixed(2)} kg
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Kondisi Baik</p>
              <p className="text-2xl font-bold text-green-600">
                {filteredData.filter(item => item.kondisi === 'Baik').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Kebun Berbeda</p>
              <p className="text-2xl font-bold text-gray-800">
                {new Set(filteredData.map(item => item.asalKebun)).size}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
