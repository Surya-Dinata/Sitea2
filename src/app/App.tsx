import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { BahanBakuMasuk } from './components/BahanBakuMasuk';
import { PenggunaanBahanBaku } from './components/PenggunaanBahanBaku';
import { Penimbangan } from './components/Penimbangan';
import { LaporanKepalaPabrik } from './components/LaporanKepalaPabrik';
import { LaporanQC } from './components/LaporanQC';
import { AdminSettings } from './components/AdminSettings';
import { FileText, Package, Scale, ClipboardList, CheckSquare, Settings, LogOut, LayoutDashboard } from 'lucide-react';

export interface User {
  username: string;
  role: 'admin' | 'kepala_pabrik' | 'operator' | 'qc';
  name: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState<string>('dashboard');

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setActivePage('dashboard');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'kepala_pabrik', 'operator', 'qc'] },
    { id: 'bahan-baku-masuk', label: 'Bahan Baku Masuk', icon: Package, roles: ['admin', 'kepala_pabrik', 'operator'] },
    { id: 'penggunaan-bahan', label: 'Penggunaan Bahan Baku', icon: ClipboardList, roles: ['admin', 'kepala_pabrik', 'operator'] },
    { id: 'penimbangan', label: 'Penimbangan', icon: Scale, roles: ['admin', 'kepala_pabrik', 'operator'] },
    { id: 'laporan-kepala', label: 'Laporan Kepala Pabrik', icon: FileText, roles: ['admin', 'kepala_pabrik'] },
    { id: 'laporan-qc', label: 'Laporan QC', icon: CheckSquare, roles: ['admin', 'kepala_pabrik', 'qc'] },
    { id: 'settings', label: 'Pengaturan Admin', icon: Settings, roles: ['admin'] },
  ];

  const visibleMenuItems = menuItems.filter(item => item.roles.includes(user.role));

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'bahan-baku-masuk':
        return <BahanBakuMasuk user={user} />;
      case 'penggunaan-bahan':
        return <PenggunaanBahanBaku user={user} />;
      case 'penimbangan':
        return <Penimbangan user={user} />;
      case 'laporan-kepala':
        return <LaporanKepalaPabrik user={user} />;
      case 'laporan-qc':
        return <LaporanQC user={user} />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Sistem Manajemen Pabrik Teh</h1>
                <p className="text-green-100 text-sm">Monitoring & Pelaporan Produksi</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-green-100 capitalize">{user.role.replace('_', ' ')}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-6">
              <div className="bg-gradient-to-br from-green-600 to-green-500 text-white p-4">
                <h2 className="font-semibold text-lg">Menu Navigasi</h2>
              </div>
              <nav className="p-2">
                {visibleMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActivePage(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all mb-1 ${
                        activePage === item.id
                          ? 'bg-green-50 text-green-700 font-semibold shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-12 lg:col-span-9">
            <div className="bg-white rounded-xl shadow-md p-6">
              {renderPage()}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>© 2026 Sistem Manajemen Pabrik Teh - Powered by Google Spreadsheet</p>
        </div>
      </footer>
    </div>
  );
}
