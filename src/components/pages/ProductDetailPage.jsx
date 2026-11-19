import { useParams, Link, useOutletContext } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '../atoms/Button';
import { formatPrice } from '../../utils/product';

export default function ProductDetailPage({ products: propProducts }) {
  const { id } = useParams();
  const context = useOutletContext() || {};
  const products = propProducts || context.products || [];

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-xl border border-slate-200 p-8 text-center shadow-sm">
        <h1 className="text-lg font-bold text-slate-800">
          Produk tidak ditemukan
        </h1>
        <p className="text-sm text-slate-500 mt-2 mb-6">
          Produk dengan ID #{id} tidak ada dalam daftar.
        </p>
        <Link to="/products">
          <Button variant="primary">
            <FiArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Produk
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition"
      >
        <FiArrowLeft className="w-4 h-4" />
        Kembali ke Daftar Produk
      </Link>

      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <span className="text-xs font-semibold text-slate-400 block mb-1">
          ID: {product.id}
        </span>
        <h1 className="text-2xl font-bold text-slate-900">
          {product.name}
        </h1>
        <p className="text-xl font-bold text-blue-600 mt-3">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}
