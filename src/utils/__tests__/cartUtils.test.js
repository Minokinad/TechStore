import { formatCurrency, calculateTotal } from "../cartUtils";

/**
 * @description Тестирование чистых функций JavaScript для работы с данными корзины
 * @case formatCurrency: проверка правильности добавления символа $ и округления до 2 знаков
 * @case calculateTotal: проверка алгоритма суммирования цен товаров в массиве
 * @case EdgeCases: обработка пустых массивов, null и некорректных типов данных
 */

describe("Cart Utilities", () => {
  test("formatCurrency: должен корректно форматировать число в строку валюты", () => {
    expect(formatCurrency(999)).toBe("$999.00");
    expect(formatCurrency(10.5)).toBe("$10.50");
  });

  test("formatCurrency: должен возвращать $0.00 для некорректных данных", () => {
    expect(formatCurrency(null)).toBe("$0.00");
    expect(formatCurrency(undefined)).toBe("$0.00");
  });

  test("calculateTotal: должен верно суммировать цены товаров", () => {
    const items = [{ price: 100 }, { price: 200 }, { price: 50 }];
    expect(calculateTotal(items)).toBe(350);
  });

  test("calculateTotal: должен возвращать 0 для пустого массива", () => {
    expect(calculateTotal([])).toBe(0);
  });

  test("calculateTotal: должен обрабатывать отсутствие цены у товара", () => {
    const items = [{ title: "No price" }, { price: 100 }];
    expect(calculateTotal(items)).toBe(100);
  });

  test("calculateTotal: должен возвращать 0, если передан не массив", () => {
    expect(calculateTotal(null)).toBe(0);
  });
});
