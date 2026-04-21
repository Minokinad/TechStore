import { render, screen, fireEvent } from "@testing-library/react";
import PriceFilter from "../../components/features/PriceFilter";

/**
 * @description Тестирование компонента фильтрации товаров (PriceFilter)
 * @case MinPriceChange: проверка обработки ввода минимальной цены пользователем
 * @case MaxPriceChange: проверка обработки ввода максимальной цены пользователем
 * @case Callback: проверка передачи типа фильтра ('min'/'max') и значения в родительский компонент
 */

describe("PriceFilter Component", () => {
  test("должен вызывать onFilterChange для обоих полей (min и max)", () => {
    const mockOnFilterChange = jest.fn();
    render(<PriceFilter onFilterChange={mockOnFilterChange} />);

    const minInput = screen.getByPlaceholderText(/Цена от/i);
    const maxInput = screen.getByPlaceholderText(/Цена до/i);

    fireEvent.change(minInput, { target: { value: "10" } });
    fireEvent.change(maxInput, { target: { value: "100" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith("min", "10");
    expect(mockOnFilterChange).toHaveBeenCalledWith("max", "100");
  });
});
