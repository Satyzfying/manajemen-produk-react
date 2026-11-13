import { useState } from 'react';

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
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-form-title"
      onClick={onClose}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 id="product-form-title" className="modal-title">
              {isEdit ? 'Edit Produk' : 'Tambah Produk'}
            </h2>
            <p className="modal-subtitle">
              {isEdit
                ? 'Perbarui informasi produk yang dipilih.'
                : 'Masukkan informasi produk baru.'}
            </p>
          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Tutup modal"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {isEdit && <span className="modal-id">ID: {product.id}</span>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="product-name">Nama Produk</label>
            <input
              id="product-name"
              type="text"
              className={`input ${errors.name ? 'input-error' : ''}`}
              placeholder="Contoh: Pulpen"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors((prev) => ({ ...prev, name: '' }));
                }
              }}
              autoFocus
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="product-price">Harga (Rp)</label>
            <input
              id="product-price"
              type="number"
              min="1"
              className={`input ${errors.price ? 'input-error' : ''}`}
              placeholder="Contoh: 5000"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                if (errors.price) {
                  setErrors((prev) => ({ ...prev, price: '' }));
                }
              }}
            />
            <p className={errors.price ? 'error-text' : 'helper-text'}>
              Harga harus lebih dari 0.
            </p>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
