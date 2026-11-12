export default function SearchBar({ searchQuery, onSearchChange, totalCount }) {
  return (
    <div className="toolbar">
      <div className="search-wrapper">
        <span className="search-icon" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          type="text"
          className="input input-search"
          placeholder="Cari nama produk..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <span className="total-count">{totalCount} produk</span>
    </div>
  );
}
