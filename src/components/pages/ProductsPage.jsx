import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import Button from '../atoms/Button';
import SearchBar from '../molecules/SearchBar';
import ProductGrid from '../organisms/ProductGrid';
import ProductFormModal from '../organisms/ProductFormModal';
import DeleteModal from '../organisms/DeleteModal';

export default function ProductsPage({
  products: propProducts,
  onSaveProduct: propOnSave,
  onDeleteProduct: propOnDelete,
}) {
  const context = useOutletContext() || {};
  const products = propProducts || context.products || [];
  const onSave = propOnSave || context.onSaveProduct;
  const onDelete = propOnDelete || context.onDeleteProduct;

  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

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

  function handleSave(formData) {
    if (onSave) {
      onSave(formData);
    }
    handleCloseForm();
  }

  function handleDeleteClick(product) {
    setDeletingProduct(product);
  }

  function handleCloseDelete() {
    setDeletingProduct(null);
  }

  function handleConfirmDelete(id) {
    if (onDelete) {
      onDelete(id);
    }
    handleCloseDelete();
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Daftar Produk
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>
        <Button variant="primary" onClick={handleAddClick}>
          <FiPlus className="w-4 h-4" />
          Tambah Produk
        </Button>
      </div>

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={products.length}
      />

      {filteredProducts.length > 0 ? (
        <>
          <ProductGrid
            products={filteredProducts}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
          <p className="text-xs text-slate-500 mt-6">
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </p>
        </>
      ) : (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <h3 className="text-base font-semibold text-slate-800">
            Produk tidak ditemukan
          </h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery.trim()
              ? `Tidak ada produk yang cocok dengan "${searchQuery.trim()}".`
              : 'Belum ada produk.'}
          </p>
          {searchQuery.trim() && (
            <div className="mt-4">
              <Button variant="secondary" onClick={() => setSearchQuery('')}>
                Reset Pencarian
              </Button>
            </div>
          )}
        </div>
      )}

      {isFormOpen && (
        <ProductFormModal
          key={editingProduct ? `edit-${editingProduct.id}` : 'add'}
          product={editingProduct}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      )}

      {deletingProduct && (
        <DeleteModal
          product={deletingProduct}
          onClose={handleCloseDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
