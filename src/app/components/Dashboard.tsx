import { useState, useEffect } from 'react';
import { User } from '../App';
import { Package, ClipboardList, Scale, CheckSquare, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dashboardAPI } from '../services/googleSheets';

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const response = await dashboardAPI.getStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  const chartData = stats?.chartData ? 
    stats.chartData.labels.map((label: string, index: number) => ({
      name: label,
      'Bahan Masuk': stats.chartData.bahanMasuk[index],
      'Produksi': stats.chartData.produksi[index]
    })) : [];

  const statCards = [
    {
      title: 'Total Bahan Masuk',
      value: `${stats?.totalBahanMasuk || 0} kg`,
      icon: Package,
      color: 'blue',
      trend: '+12%',
      trendUp: true
    },
    {
      title: 'Bahan Digunakan',
      value: `${stats?.totalBahanDigunakan || 0} kg`,
      icon: ClipboardList,
      color: 'green',
      trend: '+8%',
      trendUp: true
    },
    {
      title: 'Total Penimbangan',
      value: `${stats?.totalPenimbangan || 0}`,
      icon: Scale,
      color: 'orange',
      trend: '-3%',
      trendUp: false
    },
    {
      title: 'Status QC',
      value: stats?.statusQC || 'Baik',
      icon: CheckSquare,
      color: 'purple',
      trend: '100%',
      trendUp: true
    }
  ];

  const colorMap: any = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-600 mt-1">Ringkasan Operasional Pabrik Teh - {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Selamat Datang, {user.name}!
        </h3>
        <p className="text-gray-700">
          Anda login sebagai <span className="font-semibold capitalize">{user.role.replace('_', ' ')}</span>. 
          Gunakan menu navigasi di sebelah kiri untuk mengakses fitur yang tersedia.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`bg-gradient-to-br ${colorMap[card.color]} p-4`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800 mb-2">{card.value}</p>
                <div className="flex items-center gap-1">
                  {card.trendUp ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm font-semibold ${card.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {card.trend}
                  </span>
                  <span className="text-sm text-gray-500">vs minggu lalu</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tren Bahan Baku & Produksi (7 Hari)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Bahan Masuk" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="Produksi" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Perbandingan Mingguan (kg)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Bahan Masuk" fill="#10b981" />
              <Bar dataKey="Produksi" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Informasi Sistem</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>✓ Mode: <span className="font-semibold">Demo Mode</span></p>
            <p>✓ Database: <span className="font-semibold">Google Spreadsheet</span></p>
            <p>✓ Status Koneksi: <span className="font-semibold text-green-600">Online</span></p>
            <p>✓ Terakhir Sync: <span className="font-semibold">{new Date().toLocaleTimeString('id-ID')}</span></p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Panduan Cepat</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• Gunakan menu navigasi untuk mengakses fitur</p>
            <p>• Data otomatis tersimpan ke Google Sheet</p>
            <p>• Admin dapat mengubah link spreadsheet di menu Pengaturan</p>
            <p>• Semua laporan dapat difilter berdasarkan tanggal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
