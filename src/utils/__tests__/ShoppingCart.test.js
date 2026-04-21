import { render, screen, fireEvent } from "@testing-library/react";
import ShoppingCart from "../../components/features/ShoppingCart";

/**
 * @description Тестирование компонента корзины (ShoppingCart)
 * @case ListRendering: проверка отображения всех переданных в корзину элементов
 * @case Summary: проверка отображения корректного общего количества и итоговой суммы
 * @case UserActions: имитация клика по кнопке удаления товара и проверка вызова onRemove
 */

describe("ShoppingCart Component", () => {
  const mockItems = [
    { id: 1, title: "Item 1", price: 100, image: "/1.jpg" },
    { id: 2, title: "Item 2", price: 200, image: "/2.jpg" },
  ];

  test("должен отображать количество товаров и итоговую сумму", () => {
    render(
      <ShoppingCart
        items={mockItems}
        onRemove={() => {}}
        onCheckout={() => {}}
      />,
    );
    expect(screen.getByText(/Your Cart \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$300/i)).toBeInTheDocument();
  });
  test("должен вызывать onRemove при нажатии на крестик", () => {
    const mockOnRemove = jest.fn();
    const mockItems = [{ id: 1, title: "Item 1", price: 100, image: "/1.jpg" }];

    render(
      <ShoppingCart
        items={mockItems}
        onRemove={mockOnRemove}
        onCheckout={() => {}}
      />,
    );

    const removeButtons = screen.getAllByRole("button");

    fireEvent.click(removeButtons[0]);

    expect(mockOnRemove).toHaveBeenCalled();
  });
});
