import { useState, useEffect, useMemo } from "react";
import { products as initialData } from "../data/mockData";

export const useProducts = () => {
  const [products] = useState(initialData);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    minPrice: 0,
    maxPrice: Infinity,
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchCategory =
        filters.category === "all" || p.category === filters.category;
      const matchPrice =
        p.price >= (Number(filters.minPrice) || 0) &&
        p.price <= (Number(filters.maxPrice) || Infinity);
      return matchSearch && matchCategory && matchPrice;
    });
  }, [products, filters]);

  return { filteredProducts, updateFilter, filters };
};
