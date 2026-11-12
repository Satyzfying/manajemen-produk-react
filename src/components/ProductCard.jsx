import { formatPrice } from '../utils/product';

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="product-card">
      <div>
        <span className="product-id">ID: {product.id}</span>
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">{formatPrice(product.price)}</p>
      </div>
      <div className="card-actions">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => onDelete(product)}
        >
          Hapus
        </button>
      </div>
    </article>
  );
}
