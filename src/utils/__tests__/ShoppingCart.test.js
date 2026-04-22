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
    { cartId: 1, title: "iPhone 14 Pro", price: 999, image: "i14.jpg" },
    { cartId: 2, title: "AirPods Max", price: 549, image: "airpods.jpg" },
  ];

  test("должен отображать заголовок, товары и корректную итоговую сумму", () => {
    render(
      <ShoppingCart
        isOpen={true}
        items={mockItems}
        total={1548}
        onClose={() => {}}
        onRemove={() => {}}
        onCheckout={() => {}}
      />,
    );

    expect(screen.getByText(/Your Cart/i)).toBeInTheDocument();

    expect(screen.getByText("iPhone 14 Pro")).toBeInTheDocument();
    expect(screen.getByText("AirPods Max")).toBeInTheDocument();

    expect(screen.getByText(/\$1548\.00/i)).toBeInTheDocument();
  });

  test("должен отображать сообщение, если корзина пуста", () => {
    render(
      <ShoppingCart
        isOpen={true}
        items={[]}
        total={0}
        onClose={() => {}}
        onRemove={() => {}}
        onCheckout={() => {}}
      />,
    );

    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
  });

  test("должен вызывать onRemove при нажатии на кнопку удаления", () => {
    const mockOnRemove = jest.fn();
    render(
      <ShoppingCart
        isOpen={true}
        items={[mockItems[0]]}
        total={999}
        onClose={() => {}}
        onRemove={mockOnRemove}
        onCheckout={() => {}}
      />,
    );

    const removeBtn = screen.getByTitle(/Remove item/i);
    fireEvent.click(removeBtn);

    expect(mockOnRemove).toHaveBeenCalledWith(0);
  });

  test("кнопка Checkout должна быть заблокирована, если корзина пуста", () => {
    render(
      <ShoppingCart
        isOpen={true}
        items={[]}
        total={0}
        onClose={() => {}}
        onRemove={() => {}}
        onCheckout={() => {}}
      />,
    );

    const checkoutBtn = screen.getByRole("button", { name: /Checkout Now/i });
    expect(checkoutBtn).toBeDisabled();
  });
  test("должен быть скрыт (не иметь активных классов), когда isOpen={false}", () => {
    const { container } = render(
      <ShoppingCart
        isOpen={false}
        items={[]}
        total={0}
        onClose={() => {}}
        onRemove={() => {}}
        onCheckout={() => {}}
      />,
    );

    const overlay = container.querySelector(".cart-overlay");
    const drawer = container.querySelector(".cart-drawer");

    expect(overlay).not.toHaveClass("active");
    expect(drawer).not.toHaveClass("open");
  });
});
