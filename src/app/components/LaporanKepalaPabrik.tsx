import { useState, useEffect } from 'react';
import { User } from '../App';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { laporanKepalaPabrikAPI } from '../services/googleSheets';

interface LaporanKepala {
  id: string;
  tanggal: string;
  ringkasan: string;
  kendala: string;
  catatan: string;
}

interface LaporanKepalaPabrikProps {
  user: User;
}

export function LaporanKepalaPabrik({ user }: LaporanKepalaPabrikProps) {
  const [data, setData] = useState<LaporanKepala[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  
  const [formData, setFormData] = useState<Partial<LaporanKepala>>({
    tanggal: new Date().toISOString().split('T')[0],
    ringkasan: '',
    kendala: '',
    catatan: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await laporanKepalaPabrikAPI.getAll();
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
        await laporanKepalaPabrikAPI.update(editingId, formData);
      } else {
        await laporanKepalaPabrikAPI.add(formData);
      }
      
      setShowForm(false);
      setEditingId(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleEdit = (item: LaporanKepala) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Yakin ingin menghapus laporan ini?')) {
      try {
        await laporanKepalaPabrikAPI.delete(id);
        loadData();
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      tanggal: new Date().toISOString().split('T')[0],
      ringkasan: '',
      kendala: '',
      catatan: ''
    });
  };

  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.ringkasan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kendala.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.catatan.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !filterDate || item.tanggal === filterDate;
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Laporan Kepala Pabrik</h2>
          <p className="text-gray-600 mt-1">Laporan harian operasional dan keputusan strategis</p>
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
          Buat Laporan
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
            placeholder="Cari dalam laporan..."
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
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingId ? 'Edit Laporan' : 'Buat Laporan Baru'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Laporan <span className="text-red-500">*</span>
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
                  Ringkasan Produksi <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.ringkasan}
                  onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                  placeholder="Tuliskan ringkasan produksi hari ini, target yang dicapai, dll..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kendala Operasional <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.kendala}
                  onChange={(e) => setFormData({ ...formData, kendala: e.target.value })}
                  placeholder="Tuliskan kendala yang dihadapi (jika tidak ada, tulis 'Tidak ada kendala')..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catatan Keputusan <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.catatan}
                  onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  placeholder="Tuliskan keputusan penting, rencana tindak lanjut, dll..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  {editingId ? 'Update Laporan' : 'Simpan Laporan'}
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

      {/* Data Cards */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500">Tidak ada laporan. Klik "Buat Laporan" untuk menambahkan laporan baru.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredData.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">
                    Laporan {new Date(item.tanggal).toLocaleDateString('id-ID', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Ringkasan Produksi
                  </h4>
                  <p className="text-gray-700 leading-relaxed pl-4">{item.ringkasan}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Kendala Operasional
                  </h4>
                  <p className="text-gray-700 leading-relaxed pl-4">{item.kendala}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Catatan Keputusan
                  </h4>
                  <p className="text-gray-700 leading-relaxed pl-4">{item.catatan}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {filteredData.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Laporan</p>
            <p className="text-2xl font-bold text-gray-800">{filteredData.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
