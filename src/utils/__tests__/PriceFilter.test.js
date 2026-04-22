import { render, screen, fireEvent } from "@testing-library/react";
import PriceFilter from "../../components/features/PriceFilter";

/**
 * @description Тестирование компонента фильтрации товаров (PriceFilter)
 * @case MinPriceChange: проверка обработки ввода минимальной цены пользователем
 * @case MaxPriceChange: проверка обработки ввода максимальной цены пользователем
 * @case Callback: проверка передачи типа фильтра ('min'/'max') и значения в родительский компонент
 */

describe("PriceFilter Component", () => {
  const mockFilters = {
    search: "",
    category: "all",
    minPrice: 0,
    maxPrice: Infinity,
  };

  test("должен вызывать onFilterChange при вводе во все поля", () => {
    const mockOnFilterChange = jest.fn();
    render(
      <PriceFilter filters={mockFilters} onFilterChange={mockOnFilterChange} />,
    );

    const searchInput = screen.getByPlaceholderText(/Search products.../i);
    fireEvent.change(searchInput, { target: { value: "macbook" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith("search", "macbook");

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "Computers" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith("category", "Computers");

    const minInput = screen.getByPlaceholderText(/Price from/i);
    const maxInput = screen.getByPlaceholderText(/Price to/i);

    fireEvent.change(minInput, { target: { value: "500" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith("minPrice", "500");

    fireEvent.change(maxInput, { target: { value: "1500" } });
    expect(mockOnFilterChange).toHaveBeenCalledWith("maxPrice", "1500");
  });
});
