// cartContext.js
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
   
    const rawPrice = item.price ?? "0";
    const priceNumber = Number(
      rawPrice.toString().replace(/[^\d]/g, "")
    ) || 0;

    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [
          ...prevCart,
          {
            ...item,
            quantity: 1,
            price: priceNumber,
          },
        ];
      }
    });
  };

  const changeQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeAll = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, changeQuantity, removeAll }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
