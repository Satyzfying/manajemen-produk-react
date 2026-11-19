import { FiX, FiTrash2 } from 'react-icons/fi';
import Button from '../atoms/Button';
import { formatPrice } from '../../utils/product';

export default function DeleteModal({ product, onClose, onConfirm }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
          aria-label="Tutup modal"
          onClick={onClose}
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl mx-auto mb-3">
          <FiTrash2 />
        </div>

        <h2 id="delete-dialog-title" className="text-xl font-bold text-slate-900">
          Hapus Produk?
        </h2>
        <p className="text-sm text-slate-500 mt-1 mb-5">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left mb-6">
          <span className="block text-xs font-semibold text-slate-400 mb-1">
            ID: {product.id}
          </span>
          <h3 className="text-base font-bold text-slate-800 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm font-bold text-blue-600 mt-1">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
          <Button variant="danger" onClick={() => onConfirm(product.id)}>
            Hapus Produk
          </Button>
        </div>
      </div>
    </div>
  );
}
