import React, { useState, useEffect } from "react";

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [productsQuantity, setproductsQuantity] = useState(0);
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    setproductsQuantity(productsInCart.length);
  }, [productsInCart.length]);

  return (
    <CartContext.Provider
      value={[
        productsQuantity,
        setproductsQuantity,
        productsInCart,
        setProductsInCart,
      ]}
    >
      {children}
    </CartContext.Provider>
  );
};
