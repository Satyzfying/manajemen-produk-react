import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import ProductFormModal from './components/ProductFormModal';
import { INITIAL_PRODUCTS } from './data/initialProducts';

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  function handleAddClick() {
    setEditingProduct(null);
    setIsFormOpen(true);
  }

  function handleEditClick(product) {
    setEditingProduct(product);
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingProduct(null);
  }

  function handleSaveProduct(formData) {
    if (formData.id !== null) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === formData.id
            ? { ...item, name: formData.name, price: formData.price }
            : item
        )
      );
    } else {
      const nextId =
        products.length > 0 ? Math.max(...products.map((item) => item.id)) + 1 : 1;
      setProducts((prev) => [
        ...prev,
        { id: nextId, name: formData.name, price: formData.price },
      ]);
    }

    handleCloseForm();
  }

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

      {isFormOpen && (
        <ProductFormModal
          key={editingProduct ? `edit-${editingProduct.id}` : 'add'}
          product={editingProduct}
          onClose={handleCloseForm}
          onSave={handleSaveProduct}
        />
      )}
    </main>
  );
}
