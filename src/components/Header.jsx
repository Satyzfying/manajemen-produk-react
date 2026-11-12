export default function Header({ onAddClick }) {
  return (
    <header className="page-header">
      <div>
        <h1>Manajemen Produk</h1>
        <p>Kelola daftar produk dan harga dalam satu tempat.</p>
      </div>
      <button type="button" className="btn btn-primary" onClick={onAddClick}>
        + Tambah Produk
      </button>
    </header>
  );
}
