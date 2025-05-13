import React from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "Wireless Headphones", price: 120, image: "/images/headphones.jpg" },
  { id: 2, name: "Smart Watch", price: 250, image: "/images/smartwatch.jpg" },
  { id: 3, name: "Bluetooth Speaker", price: 80, image: "/images/speaker.jpg" },
  { id: 4, name: "Phones", price: 45, image: "/images/laptop-stand.jpg" },
  { id: 5, name: "Chairs", price: 45, image: "/images/laptop-stand.jpg" },
  { id: 6, name: "Iphone Charger", price: 45, image: "/images/laptop-stand.jpg" },
  { id: 7, name: "Laptop", price: 45, image: "/images/laptop-stand.jpg" },
  { id: 8, name: "Laptop Stand", price: 45, image: "/images/laptop-stand.jpg" },
  { id: 9, name: "Laptop Bag", price: 45, image: "/images/laptop-stand.jpg" },
  { id: 10, name: "Power Bank", price: 45, image: "/images/laptop-stand.jpg" },
];

const ProductList: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded-lg shadow hover:shadow-lg transition duration-200">
            <ProductCard product={product} onAddToCart={() => addToCart(product)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
