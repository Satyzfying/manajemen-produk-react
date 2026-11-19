import { Link } from 'react-router';
import Button from '../atoms/Button';

export default function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto my-16 bg-white rounded-xl border border-slate-200 p-8 text-center shadow-sm">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-2">
        404
      </h1>
      <h2 className="text-lg font-bold text-slate-800">
        Halaman tidak ditemukan
      </h2>
      <p className="text-sm text-slate-500 mt-2 mb-6">
        Halaman yang kamu cari tidak tersedia atau URL salah.
      </p>

      <div className="flex items-center justify-center gap-3">
        <Link to="/products">
          <Button variant="primary">
            Kembali ke Produk
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="secondary">
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
