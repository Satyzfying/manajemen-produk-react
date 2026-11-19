import { Outlet } from 'react-router';
import Sidebar from '../organisms/Sidebar';

export default function AppLayout({ products, onSaveProduct, onDeleteProduct }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl w-full mx-auto overflow-y-auto">
        <Outlet context={{ products, onSaveProduct, onDeleteProduct }} />
      </main>
    </div>
  );
}
