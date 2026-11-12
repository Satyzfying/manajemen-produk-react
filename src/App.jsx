import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import { INITIAL_PRODUCTS } from './data/initialProducts';

export default function App() {
  const [products] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  function handleAddClick() {}

  function handleEditClick() {}

  function handleDeleteClick() {}

  return (
    <main className="container">
      <Header onAddClick={handleAddClick} />

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={products.length}
      />

      {filteredProducts.length > 0 ? (
        <>
          <section className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </section>
          <p className="list-footer">
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </p>
        </>
      ) : (
        <section className="empty-state">
          <h3>Produk tidak ditemukan</h3>
          <p>
            {searchQuery.trim()
              ? `Tidak ada produk yang cocok dengan "${searchQuery.trim()}".`
              : 'Belum ada produk. Tambahkan produk pertama Anda.'}
          </p>
          {searchQuery.trim() && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setSearchQuery('')}
            >
              Reset Pencarian
            </button>
          )}
        </section>
      )}
    </main>
  );
}
