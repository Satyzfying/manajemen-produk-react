export default function StatCard({ title, value, icon: Icon, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
      {Icon && (
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${colorMap[color] || colorMap.blue}`}>
          <Icon />
        </div>
      )}
    </div>
  );
}
