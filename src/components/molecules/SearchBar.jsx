import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ searchQuery, onSearchChange, totalCount }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
      <div className="relative flex-1 max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <FiSearch className="w-4 h-4" />
        </span>
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
          placeholder="Cari nama produk..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <span className="text-sm font-medium text-slate-500 whitespace-nowrap self-end sm:self-center">
        {totalCount} produk
      </span>
    </div>
  );
}
