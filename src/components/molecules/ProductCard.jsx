import { Link } from 'react-router';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Button from '../atoms/Button';
import { formatPrice } from '../../utils/product';

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between gap-4">
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
          <span>ID: {product.id}</span>
          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline"
          >
            <FiEye className="w-3.5 h-3.5" />
            Detail
          </Link>
        </div>
        <h2 className="text-lg font-bold text-slate-800 line-clamp-1">
          <Link to={`/products/${product.id}`} className="hover:text-blue-600 transition">
            {product.name}
          </Link>
        </h2>
        <p className="text-lg font-bold text-blue-600 mt-1">
          {formatPrice(product.price)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
        <Button
          variant="outlinePrimary"
          className="text-xs py-1.5"
          onClick={() => onEdit(product)}
        >
          <FiEdit2 className="w-3.5 h-3.5" />
          Edit
        </Button>
        <Button
          variant="outlineDanger"
          className="text-xs py-1.5"
          onClick={() => onDelete(product)}
        >
          <FiTrash2 className="w-3.5 h-3.5" />
          Hapus
        </Button>
      </div>
    </article>
  );
}
