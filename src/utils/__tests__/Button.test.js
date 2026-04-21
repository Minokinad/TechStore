import { render, screen } from "@testing-library/react";
import Button from "../../components/ui/Button";

/**
 * @description Тестирование базового UI-компонента кнопки
 * @case Rendering: проверка отображения текста (children) внутри кнопки
 * @case DefaultProps: проверка применения класса btn--primary при отсутствии пропса variant
 */

describe("Button Component", () => {
  test("должен рендериться с дефолтным вариантом primary", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn--primary");
  });
});
