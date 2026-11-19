import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import AppLayout from './components/templates/AppLayout';
import DashboardPage from './components/pages/DashboardPage';
import ProductsPage from './components/pages/ProductsPage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import NotFoundPage from './components/pages/NotFoundPage';
import * as productApi from './services/productApi';

export default function App() {
  const [products, setProducts] = useState(() => productApi.getLocalProducts());

  useEffect(() => {
    let active = true;
    async function loadData() {
      try {
        const data = await productApi.getProducts();
        if (active && Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      } catch {
        // ignore
      }
    }
    loadData();
    return () => {
      active = false;
    };
  }, []);

  async function handleSaveProduct(formData) {
    if (formData.id !== null) {
      const updated = await productApi.updateProduct(formData);
      setProducts((prev) =>
        prev.map((item) => (String(item.id) === String(formData.id) ? updated : item))
      );
    } else {
      const created = await productApi.createProduct(formData);
      setProducts((prev) => [...prev, created]);
    }
  }

  async function handleDeleteProduct(id) {
    await productApi.deleteProduct(id);
    setProducts((prev) => prev.filter((item) => String(item.id) !== String(id)));
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
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
