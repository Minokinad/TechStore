const PriceFilter = ({ onFilterChange }) => {
  return (
    <div
      style={{
        marginBottom: "30px",
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <strong>Фильтры:</strong>
      <input
        className="search-form__input"
        style={{ width: "150px" }}
        type="number"
        placeholder="Цена от"
        onChange={(e) => onFilterChange("min", e.target.value)}
      />
      <input
        className="search-form__input"
        style={{ width: "150px" }}
        type="number"
        placeholder="Цена до"
        onChange={(e) => onFilterChange("max", e.target.value)}
      />
    </div>
  );
};
export default PriceFilter;
