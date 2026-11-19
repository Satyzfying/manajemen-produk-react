import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import Button from '../atoms/Button';

export default function ProductFormModal({ product, onClose, onSave }) {
  const isEdit = Boolean(product);
  const [name, setName] = useState(product ? product.name : '');
  const [price, setPrice] = useState(product ? String(product.price) : '');
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedName = name.trim();
    const numericPrice = Number(price);
    const nextErrors = {};

    if (!trimmedName) {
      nextErrors.name = 'Nama produk wajib diisi.';
    }
    if (!price || Number.isNaN(numericPrice) || numericPrice <= 0) {
      nextErrors.price = 'Harga harus lebih dari 0.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave({
      id: product ? product.id : null,
      name: trimmedName,
      price: Math.round(numericPrice),
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-form-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl relative"
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

        <div className="mb-5">
          <h2 id="product-form-title" className="text-xl font-bold text-slate-900">
            {isEdit ? 'Edit Produk' : 'Tambah Produk'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {isEdit
              ? 'Perbarui informasi produk yang dipilih.'
              : 'Masukkan informasi produk baru.'}
          </p>
          {isEdit && (
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md bg-slate-100 text-xs font-semibold text-slate-600">
              ID: {product.id}
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="product-name" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Nama Produk
            </label>
            <input
              id="product-name"
              type="text"
              className={`w-full px-3.5 py-2 bg-white border rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              }`}
              placeholder="Contoh: Pulpen"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
              autoFocus
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="product-price" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Harga (Rp)
            </label>
            <input
              id="product-price"
              type="number"
              min="1"
              className={`w-full px-3.5 py-2 bg-white border rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.price ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'
              }`}
              placeholder="Contoh: 5000"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errors.price) setErrors((prev) => ({ ...prev, price: '' }));
              }}
            />
            <p className={`text-xs mt-1 ${errors.price ? 'text-red-600' : 'text-slate-400'}`}>
              Harga harus lebih dari 0.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3">
            <Button variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button variant="primary" type="submit">
              {isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
