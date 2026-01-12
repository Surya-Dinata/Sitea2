import { useState } from 'react';
import { User } from '../App';
import { Package, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

// Demo users for testing
const DEMO_USERS = [
  { username: 'admin', password: 'admin123', role: 'admin' as const, name: 'Administrator' },
  { username: 'kepala', password: 'kepala123', role: 'kepala_pabrik' as const, name: 'Kepala Pabrik' },
  { username: 'operator', password: 'operator123', role: 'operator' as const, name: 'Operator Produksi' },
  { username: 'qc', password: 'qc123', role: 'qc' as const, name: 'Tim Quality Control' },
];

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = DEMO_USERS.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      onLogin({
        username: user.username,
        role: user.role,
        name: user.name
      });
    } else {
      setError('Username atau password salah');
    }
  };

  const handleDemoLogin = (user: typeof DEMO_USERS[0]) => {
    onLogin({
      username: user.username,
      role: user.role,
      name: user.name
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-green-500 rounded-2xl shadow-lg mb-4">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Sistem Manajemen Pabrik Teh
          </h1>
          <p className="text-gray-600">Monitoring & Pelaporan Produksi</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                placeholder="Masukkan username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                placeholder="Masukkan password"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold py-3 rounded-lg hover:from-green-700 hover:to-green-600 transition-all shadow-md hover:shadow-lg"
            >
              Masuk
            </button>
          </form>

          {/* Demo Accounts Toggle */}
          <div className="mt-6">
            <button
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="w-full text-sm text-green-600 hover:text-green-700 font-medium"
            >
              {showDemoAccounts ? '▼ Sembunyikan Akun Demo' : '▶ Tampilkan Akun Demo'}
            </button>

            {showDemoAccounts && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Akun Demo:</p>
                <div className="space-y-2">
                  {DEMO_USERS.map((user) => (
                    <button
                      key={user.username}
                      onClick={() => handleDemoLogin(user)}
                      className="w-full text-left p-3 bg-white rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-800">{user.name}</div>
                          <div className="text-xs text-gray-500">
                            {user.username} / {user.password}
                          </div>
                        </div>
                        <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {user.role.replace('_', ' ')}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Aplikasi berbasis Google Spreadsheet</p>
          <p className="mt-1">Untuk demo, gunakan salah satu akun di atas</p>
        </div>
      </div>
    </div>
  );
}
