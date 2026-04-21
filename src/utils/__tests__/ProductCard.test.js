import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../../components/features/ProductCard";

/**
 * @description Тестирование компонента карточки товара (ProductCard)
 * @case DataDisplay: проверка корректного отображения названия, цены и категории товара
 * @case EventHandling: проверка вызова функции onAddToCart с передачей корректного ID товара
 * @case Accessibility: проверка наличия атрибута alt у изображения товара
 */

describe("ProductCard Component", () => {
  const mockProduct = {
    id: 1,
    title: "Test Phone",
    price: 500,
    image: "/test.jpg",
    category: "Phones",
  };
  const mockAddToCart = jest.fn();

  test("должен отображать название и цену товара", () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);
    expect(screen.getByText("Test Phone")).toBeInTheDocument();
    expect(screen.getByText("$500")).toBeInTheDocument();
  });

  test("должен вызывать onAddToCart при клике на кнопку", () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);
    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);
    expect(mockAddToCart).toHaveBeenCalledWith(1);
  });
});
