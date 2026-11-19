const styles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
  secondary: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-sm',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
  outlinePrimary: 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50',
  outlineDanger: 'bg-white text-red-600 border border-red-200 hover:bg-red-50',
};

export default function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  children,
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant] || styles.primary} ${className}`}
    >
      {children}
    </button>
  );
}
