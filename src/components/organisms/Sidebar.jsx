import { NavLink } from 'react-router';
import { FiHome, FiBox, FiLayers } from 'react-icons/fi';

export default function Sidebar() {
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: FiHome },
    { to: '/products', label: 'Daftar Produk', icon: FiBox },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 shrink-0 flex flex-col">
      <div className="p-5 border-b border-slate-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center text-lg shadow-sm">
          <FiLayers />
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-900 leading-tight">
            Manajemen Produk
          </h1>
          <p className="text-xs text-slate-400">Pemrograman Web</p>
        </div>
      </div>

      <nav className="p-3 md:p-4 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="hidden md:block mt-auto p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500">
          <p className="font-semibold text-slate-700">Tugas 4 — Week 13</p>
          <p className="mt-0.5">React Router & Tailwind CSS</p>
        </div>
      </div>
    </aside>
  );
}
