import { useOutletContext, Link } from 'react-router';
import { FiBox, FiDollarSign, FiTrendingUp, FiAward, FiArrowRight, FiEye } from 'react-icons/fi';
import StatCard from '../molecules/StatCard';
import { formatPrice } from '../../utils/product';

export default function DashboardPage({ products: propProducts }) {
  const context = useOutletContext() || {};
  const products = propProducts || context.products || [];

  const totalProducts = products.length;
  const totalValue = products.reduce((acc, curr) => acc + Number(curr.price || 0), 0);
  const averagePrice = totalProducts > 0 ? Math.round(totalValue / totalProducts) : 0;
  const highestPriced =
    products.length > 0 ? [...products].sort((a, b) => b.price - a.price)[0] : null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Ringkasan data inventaris dan statistik produk secara real-time.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-sm self-start sm:self-auto"
        >
          <span>Kelola Produk</span>
          <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Produk"
          value={`${totalProducts} Item`}
          icon={FiBox}
          color="blue"
        />
        <StatCard
          title="Total Nilai Aset"
          value={formatPrice(totalValue)}
          icon={FiDollarSign}
          color="green"
        />
        <StatCard
          title="Rata-rata Harga"
          value={formatPrice(averagePrice)}
          icon={FiTrendingUp}
          color="purple"
        />
        <StatCard
          title="Harga Tertinggi"
          value={highestPriced ? formatPrice(highestPriced.price) : 'Rp0'}
          icon={FiAward}
          color="amber"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Daftar Produk Terkini
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar produk yang tersimpan dalam sistem
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
          >
            Lihat semua
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 px-2">ID</th>
                  <th className="pb-3 px-2">Nama Produk</th>
                  <th className="pb-3 px-2">Harga</th>
                  <th className="pb-3 px-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.slice(0, 5).map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/75 transition">
                    <td className="py-3 px-2 font-medium text-slate-400 text-xs">
                      #{p.id}
                    </td>
                    <td className="py-3 px-2 font-semibold text-slate-800">
                      {p.name}
                    </td>
                    <td className="py-3 px-2 text-blue-600 font-bold">
                      {formatPrice(p.price)}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <Link
                        to={`/products/${p.id}`}
                        className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-blue-600 font-medium py-1 px-2 rounded-md hover:bg-slate-100 transition"
                      >
                        <FiEye className="w-3.5 h-3.5" />
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-slate-500 py-6 text-center">
            Belum ada produk untuk ditampilkan.
          </p>
        )}
      </div>
    </div>
  );
}
