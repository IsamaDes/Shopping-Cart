import React, { createContext, useContext, useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  total: number;
  applyCoupon: (code: string) => void;
  error: string | null;
  discount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const CART_STORAGE_KEY = "shopping_cart";
const COUPON_CODE = "WEB3BRIDGECOHORTx";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      setError("Quantity cannot be less than 1");
      return;
    }
    setError(null);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const applyCoupon = (code: string) => {
    if (code === COUPON_CODE) {
      setDiscount(0.1); // 10% Discount
      setError(null);
    } else {
      setDiscount(0);
      setError("Invalid Coupon Code");
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0) * (1 - discount);

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        updateQuantity, 
        total, 
        applyCoupon, 
        error, 
        discount 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
