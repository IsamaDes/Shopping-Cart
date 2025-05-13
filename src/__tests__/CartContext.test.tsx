import React from "react";
import { render, screen } from "@testing-library/react";
import { CartProvider, useCart } from "../context/CartContext";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

const TestComponent: React.FC = () => {
  const { cart, addToCart, total, applyCoupon, updateQuantity } = useCart();

  return (
    <div>
      <button onClick={() => addToCart({ id: 1, name: "Test Product", price: 100, image: "" })}>
        Add to Cart
      </button>
      <button onClick={() => applyCoupon("WEB3BRIDGECOHORTx")}>Apply Coupon</button>
      <button onClick={() => updateQuantity(1, 2)}>Update Quantity</button>
      <div data-testid="cart-length">{cart.length}</div>
      <div data-testid="cart-total">${total.toFixed(2)}</div>
    </div>
  );
};

describe("CartContext", () => {
  test("adds product to cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add to Cart");
    act(() => {
      addButton.click();
    });

    expect(screen.getByTestId("cart-length")).toHaveTextContent("1");
  });

  test("updates total price correctly", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add to Cart");
    act(() => {
      addButton.click();
    });

    expect(screen.getByTestId("cart-total")).toHaveTextContent("$100.00");
  });

  test("applies coupon discount", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add to Cart");
    const couponButton = screen.getByText("Apply Coupon");

    act(() => {
      addButton.click();
      couponButton.click();
    });

    expect(screen.getByTestId("cart-total")).toHaveTextContent("$90.00"); // 10% Discount
  });

  test("updates quantity correctly", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add to Cart");
    const updateButton = screen.getByText("Update Quantity");

    act(() => {
      addButton.click();
      updateButton.click();
    });

    expect(screen.getByTestId("cart-total")).toHaveTextContent("$200.00");
  });
});
