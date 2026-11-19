import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import AppLayout from './components/templates/AppLayout';
import ProductsPage from './components/pages/ProductsPage';
import { INITIAL_PRODUCTS } from './data/initialProducts';

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

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
  }

  function handleDeleteProduct(id) {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout
            products={products}
            onSaveProduct={handleSaveProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        }
      >
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
}
