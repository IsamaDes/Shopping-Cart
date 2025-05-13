import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { cart, total, removeFromCart, updateQuantity, applyCoupon, error } = useCart();
  const [coupon, setCoupon] = useState<string>("");

  const handleApplyCoupon = () => {
    applyCoupon(coupon);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>
      {error && <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">{error}</div>}
      {cart.map((item) => (
        <div key={item.id} className="border p-4 mb-2 rounded-lg">
          {item.name} - ${item.price} x 
          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            className="ml-2 border p-1 w-16"
          />
          <button 
            onClick={() => removeFromCart(item.id)}
            className="ml-4 text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-4">
        <input
          type="text"
          value={coupon}
          placeholder="Enter Coupon Code"
          onChange={(e) => setCoupon(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleApplyCoupon} className="bg-blue-500 text-white p-2 rounded">
          Apply Coupon
        </button>
      </div>

      <h3 className="mt-6 text-xl font-bold">Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
