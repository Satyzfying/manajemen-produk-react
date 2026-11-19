import { INITIAL_PRODUCTS } from '../data/initialProducts';

const STORAGE_KEY = 'manajemen_produk_list';
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export function getLocalProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return INITIAL_PRODUCTS;
}

export function saveLocalProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // ignore
  }
}

export async function getProducts() {
  try {
    const response = await fetch(`${API_BASE}/products`, {
      headers: { 'Accept': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      const list = Array.isArray(data) ? data : (data.data || []);
      if (list.length > 0) {
        saveLocalProducts(list);
        return list;
      }
    }
  } catch {
    // ignore
  }
  return getLocalProducts();
}

export async function getProductById(id) {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // ignore
  }
  const products = getLocalProducts();
  return products.find((p) => String(p.id) === String(id)) || null;
}

export async function createProduct(payload) {
  try {
    const response = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: payload.name,
        price: Number(payload.price),
      }),
    });
    if (response.ok) {
      const created = await response.json();
      const current = getLocalProducts();
      saveLocalProducts([...current, created]);
      return created;
    }
  } catch {
    // ignore
  }

  const current = getLocalProducts();
  const nextId = current.length > 0 ? Math.max(...current.map((p) => Number(p.id) || 0)) + 1 : 1;
  const newProduct = {
    id: nextId,
    name: payload.name,
    price: Number(payload.price),
  };
  saveLocalProducts([...current, newProduct]);
  return newProduct;
}

export async function updateProduct(payload) {
  try {
    const response = await fetch(`${API_BASE}/products/${payload.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: payload.id,
        name: payload.name,
        price: Number(payload.price),
      }),
    });
    if (response.ok) {
      const updated = await response.json();
      const current = getLocalProducts().map((p) =>
        String(p.id) === String(payload.id) ? updated : p
      );
      saveLocalProducts(current);
      return updated;
    }
  } catch {
    // ignore
  }

  const current = getLocalProducts().map((p) =>
    String(p.id) === String(payload.id)
      ? { ...p, name: payload.name, price: Number(payload.price) }
      : p
  );
  saveLocalProducts(current);
  return { id: payload.id, name: payload.name, price: Number(payload.price) };
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const current = getLocalProducts().filter((p) => String(p.id) !== String(id));
      saveLocalProducts(current);
      return true;
    }
  } catch {
    // ignore
  }

  const current = getLocalProducts().filter((p) => String(p.id) !== String(id));
  saveLocalProducts(current);
  return true;
}
