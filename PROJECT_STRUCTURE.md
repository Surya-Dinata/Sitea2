# 📁 Struktur Proyek

Dokumentasi lengkap struktur file dan folder Sistem Manajemen Pabrik Teh.

## 📂 Root Directory

```
sistem-pabrik-teh/
├── 📄 README.md                    # Project overview & quick start
├── 📄 DOKUMENTASI.md               # Dokumentasi lengkap (Bahasa Indonesia)
├── 📄 QUICK_START.md              # Panduan cepat 5 menit
├── 📄 DEPLOYMENT.md               # Panduan deployment production
├── 📄 TEMPLATE_SPREADSHEET.md     # Template & struktur Google Sheets
├── 📄 CHANGELOG.md                # Version history & changes
├── 📄 LICENSE                     # MIT License
├── 📄 PROJECT_STRUCTURE.md        # File ini
├── 📄 .gitignore                  # Git ignore rules
├── 📄 package.json                # Dependencies & scripts
├── 📄 vite.config.ts              # Vite configuration
├── 📄 postcss.config.mjs          # PostCSS configuration
├── 📄 GoogleAppsScript.gs         # Google Apps Script backend code
└── 📁 src/                        # Source code
```

---

## 📁 /src Directory

```
src/
├── 📁 app/                         # Application code
│   ├── 📄 App.tsx                 # ⭐ Main application component
│   ├── 📁 components/             # React components
│   │   ├── 📄 Login.tsx          # ⭐ Login & authentication
│   │   ├── 📄 Dashboard.tsx      # ⭐ Dashboard dengan charts
│   │   ├── 📄 BahanBakuMasuk.tsx # Laporan bahan baku
│   │   ├── 📄 PenggunaanBahanBaku.tsx # Tracking penggunaan
│   │   ├── 📄 Penimbangan.tsx    # Penimbangan & penyusutan
│   │   ├── 📄 LaporanKepalaPabrik.tsx # Laporan manajerial
│   │   ├── 📄 LaporanQC.tsx      # Quality control reports
│   │   ├── 📄 AdminSettings.tsx  # ⭐ Admin configuration panel
│   │   ├── 📁 figma/             # Figma imports (protected)
│   │   └── 📁 ui/                # Reusable UI components
│   └── 📁 services/              # Business logic & API
│       └── 📄 googleSheets.ts    # ⭐ Google Sheets integration
└── 📁 styles/                     # Styling
    ├── 📄 fonts.css              # Font imports
    ├── 📄 index.css              # Global styles
    ├── 📄 tailwind.css           # Tailwind base
    └── 📄 theme.css              # Theme & CSS variables
```

**⭐ = Core files (jangan hapus)**

---

## 🎯 Core Components Detail

### App.tsx (Main Application)
```
📦 Responsibilities:
├── User authentication state
├── Page routing & navigation
├── Menu rendering (role-based)
├── Header & footer
└── Layout structure
```

### Login.tsx
```
📦 Features:
├── Username/password form
├── Demo accounts display
├── Session management
├── Auto-login for returning users
└── Role-based redirect
```

### Dashboard.tsx
```
📦 Features:
├── Statistics cards (4 metrics)
├── Line chart (tren 7 hari)
├── Bar chart (perbandingan)
├── Welcome message
├── System info
└── Quick guide
```

### BahanBakuMasuk.tsx
```
📦 Features:
├── CRUD operations
├── Search & filter
├── Form validation
├── Summary statistics
└── Kondisi badge dengan color
```

### PenggunaanBahanBaku.tsx
```
📦 Features:
├── Proses produksi dropdown
├── Stock tracking
├── Summary total
└── Search & filter
```

### Penimbangan.tsx
```
📦 Features:
├── Auto-calculation penyusutan
├── Tahap produksi tracking
├── Berat awal/akhir
└── Summary statistics
```

### LaporanKepalaPabrik.tsx
```
📦 Features:
├── Card-based layout
├── Rich text fields
├── Sections: Ringkasan, Kendala, Catatan
└── Easy to read format
```

### LaporanQC.tsx
```
📦 Features:
├── Multi-parameter checks
├── 8 parameter standar
├── Tahap proses tracking
└── Summary analytics
```

### AdminSettings.tsx
```
📦 Features:
├── Google Sheets configuration
├── Demo/Production mode toggle
├── Connection status
├── Documentation & guide
└── Apps Script code example
```

---

## 🔧 Services Layer

### googleSheets.ts
```
📦 Exports:
├── getSheetConfig()          # Get config dari localStorage
├── updateSheetConfig()       # Update config
├── callGoogleScript()        # Generic API caller
├── getDemoData()            # Mock data untuk demo
│
├── API Objects:
│   ├── bahanBakuAPI
│   ├── penggunaanBahanAPI
│   ├── penimbanganAPI
│   ├── laporanKepalaPabrikAPI
│   ├── laporanQCAPI
│   └── dashboardAPI
│
└── Each API has:
    ├── getAll()
    ├── add(data)
    ├── update(id, data)
    └── delete(id)
```

---

## 🎨 Styling Structure

### theme.css
```css
/* CSS Variables */
:root {
  --color-primary: #10b981;      /* Green */
  --color-secondary: #3b82f6;    /* Blue */
  --color-accent: #f59e0b;       /* Orange */
  /* ... dan lainnya */
}
```

### Tailwind Classes
```
Commonly used:
├── bg-green-600         # Primary button
├── text-gray-800        # Main text
├── rounded-lg           # Rounded corners
├── shadow-md            # Card shadow
└── hover:bg-green-700   # Hover states
```

---

## 📊 Data Flow

### 1. User Action (Frontend)
```
User clicks "Tambah Data"
    ↓
Component state updates (showForm = true)
    ↓
Form renders
    ↓
User fills & submits
```

### 2. API Call
```
handleSubmit() triggered
    ↓
Calls API (e.g., bahanBakuAPI.add(data))
    ↓
googleSheets.ts processes
    ↓
callGoogleScript() sends request
```

### 3. Backend (Google Apps Script)
```
doPost(e) receives request
    ↓
Routes to appropriate function
    ↓
Interacts with Spreadsheet
    ↓
Returns JSON response
```

### 4. Frontend Update
```
Response received
    ↓
Component state updates
    ↓
UI re-renders
    ↓
User sees new data
```

---

## 🔐 Role-Based Access

### Menu Visibility Matrix

| Component | Admin | Kepala | Operator | QC |
|-----------|-------|--------|----------|-----|
| Dashboard | ✅ | ✅ | ✅ | ✅ |
| Bahan Baku | ✅ | ✅ | ✅ | ❌ |
| Penggunaan | ✅ | ✅ | ✅ | ❌ |
| Penimbangan | ✅ | ✅ | ✅ | ❌ |
| Laporan Kepala | ✅ | ✅ | ❌ | ❌ |
| Laporan QC | ✅ | ✅ | ❌ | ✅ |
| Admin Settings | ✅ | ❌ | ❌ | ❌ |

**Implemented in:** `/src/app/App.tsx` (menuItems filter)

---

## 📦 Dependencies Mapping

### Production Dependencies
```
UI Framework:
├── react              # Core framework
├── react-dom          # DOM rendering
└── lucide-react       # Icons

Styling:
├── tailwindcss        # Utility-first CSS
└── @tailwindcss/vite  # Vite plugin

Charts:
└── recharts          # Data visualization

Date:
└── date-fns          # Date utilities

Forms:
└── react-hook-form   # Form handling (optional)
```

### Dev Dependencies
```
Build:
├── vite              # Build tool & dev server
└── @vitejs/plugin-react  # React plugin

TypeScript:
└── TypeScript types dari peer dependencies
```

---

## 🗂️ File Size Reference

```
Typical sizes (development):
├── App.tsx                ~5KB
├── Dashboard.tsx          ~7KB
├── BahanBakuMasuk.tsx    ~10KB
├── Login.tsx             ~4KB
├── googleSheets.ts       ~6KB
└── Total /src            ~100KB

Build output (production):
├── HTML                  ~2KB
├── JS bundle            ~500KB (with chunks)
├── CSS                  ~50KB
└── Total dist/          ~600KB
```

---

## 🚀 Build Process

### Development
```bash
npm run dev
    ↓
Vite starts dev server
    ↓
Hot Module Replacement active
    ↓
Available at localhost:5173
```

### Production
```bash
npm run build
    ↓
TypeScript compilation
    ↓
Vite bundling & optimization
    ↓
Output to /dist folder
    ↓
Ready for deployment
```

---

## 🔄 State Management

### Component-level State
```typescript
// Local state dengan useState
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [showForm, setShowForm] = useState(false);
```

### Global State (localStorage)
```typescript
// User session
localStorage.setItem('user', JSON.stringify(user));

// Google Sheets config
localStorage.setItem('sheetConfig', JSON.stringify(config));
```

**No Redux/Context needed** - Simple & lightweight!

---

## 📝 Code Conventions

### Naming
```
Components:     PascalCase     (Dashboard.tsx)
Functions:      camelCase      (handleSubmit)
Constants:      UPPER_CASE     (DEMO_USERS)
Interfaces:     PascalCase     (interface User {})
CSS Classes:    kebab-case     (bg-green-600)
```

### File Organization
```
Component structure:
├── Imports
├── Interface definitions
├── Props interface
├── Component function
├── State declarations
├── useEffect hooks
├── Handler functions
├── Helper functions
├── Render return
└── Export
```

---

## 🧪 Testing Approach

### Manual Testing
```
✅ Test all CRUD operations
✅ Test search & filter
✅ Test form validation
✅ Test role-based access
✅ Test demo mode
✅ Test production mode
✅ Test responsive design
```

### Browser Testing
```
✅ Chrome (primary)
✅ Firefox
✅ Safari
✅ Edge
```

---

## 📈 Performance Optimization

### Implemented
```
✅ Lazy loading (implicit via Vite)
✅ Code splitting (automatic)
✅ Minification in production
✅ Tree shaking
✅ CSS purging (Tailwind)
```

### Future Improvements
```
⏳ Image optimization
⏳ Service worker (PWA)
⏳ Caching strategies
⏳ Bundle size monitoring
```

---

## 🔒 Security Measures

### Frontend
```
✅ No sensitive data in code
✅ localStorage for session (temporary)
✅ Input validation
✅ XSS prevention (React default)
```

### Backend (Apps Script)
```
✅ Server-side execution
✅ Google OAuth
✅ Spreadsheet permissions
✅ Quota limits
```

---

## 📚 Documentation Files Purpose

| File | Purpose | Target Audience |
|------|---------|-----------------|
| README.md | Overview & badges | All users |
| DOKUMENTASI.md | Comprehensive guide | Developers & Admins |
| QUICK_START.md | 5-min setup | New users |
| DEPLOYMENT.md | Production deploy | DevOps |
| TEMPLATE_SPREADSHEET.md | Database structure | Data managers |
| CHANGELOG.md | Version history | All users |
| PROJECT_STRUCTURE.md | Code reference | Developers |

---

## 🛠️ Maintenance Guide

### Regular Tasks
```
Weekly:
├── Check Apps Script quota
├── Backup Google Spreadsheet
└── Monitor user feedback

Monthly:
├── Update dependencies
├── Review error logs
└── Archive old data

Quarterly:
├── Security audit
├── Performance review
└── Feature planning
```

---

## 🎓 Learning Resources

### For Developers
```
React:          https://react.dev
TypeScript:     https://typescriptlang.org
Tailwind:       https://tailwindcss.com
Recharts:       https://recharts.org
Vite:           https://vitejs.dev
```

### For Google Sheets
```
Apps Script:    https://developers.google.com/apps-script
Sheets API:     https://developers.google.com/sheets
```

---

## 📞 Support & Contact

**Before Asking:**
1. ✅ Read DOKUMENTASI.md
2. ✅ Check QUICK_START.md
3. ✅ Review DEPLOYMENT.md
4. ✅ Check browser console
5. ✅ Review Apps Script logs

**Common Issues:**
- Data tidak tersimpan → Check DOKUMENTASI.md → Troubleshooting
- Apps Script error → Check execution logs
- Build error → Check node_modules & package.json

---

**Last Updated:** 2026-01-06  
**Version:** 1.0.0  
**Maintained by:** Sistem Manajemen Pabrik Teh Team

---

*Struktur ini dirancang untuk kemudahan maintenance dan skalabilitas* ✨
