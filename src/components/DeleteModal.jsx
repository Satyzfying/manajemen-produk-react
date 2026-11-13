import { formatPrice } from '../utils/product';

export default function DeleteModal({ product, onClose, onConfirm }) {
  if (!product) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      onClick={onClose}
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="btn-close modal-close-top"
          aria-label="Tutup modal"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="modal-header-center">
          <div className="delete-badge" aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </div>
          <h2 id="delete-dialog-title" className="modal-title">
            Hapus Produk?
          </h2>
          <p className="modal-subtitle">
            Produk yang dihapus tidak dapat dikembalikan.
          </p>
        </div>

        <div className="delete-summary">
          <span className="product-id">ID: {product.id}</span>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">{formatPrice(product.price)}</p>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Batal
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirm(product.id)}
          >
            Hapus Produk
          </button>
        </div>
      </div>
    </div>
  );
}
