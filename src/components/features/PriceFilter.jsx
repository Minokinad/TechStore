const PriceFilter = ({ filters, onFilterChange }) => {
  return (
    <div
      className="admin-panel"
      style={{ padding: "20px", background: "#f9f9f9", borderRadius: "8px" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "15px",
        }}
      >
        <input
          className="search-form__input"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />
        <select
          className="search-form__input"
          value={filters.category}
          onChange={(e) => onFilterChange("category", e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Phones">Phones</option>
          <option value="Computers">Computers</option>
          <option value="Watches">Watches</option>
        </select>
        <input
          type="number"
          className="search-form__input"
          placeholder="Price from"
          onChange={(e) => onFilterChange("minPrice", e.target.value)}
        />
        <input
          type="number"
          className="search-form__input"
          placeholder="Price to"
          onChange={(e) => onFilterChange("maxPrice", e.target.value)}
        />
      </div>
    </div>
  );
};
export default PriceFilter;
