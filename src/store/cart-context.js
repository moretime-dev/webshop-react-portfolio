import React, { useState, useEffect } from "react";

export const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [productsQuantity, setproductsQuantity] = useState(0);
  const [productsInCart, setProductsInCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setproductsQuantity(productsInCart.length);
    let currentTotal = 0;
    productsInCart.forEach((product) => {
      currentTotal += product[0].price * product.productQuantity;
    });
    setTotalPrice(currentTotal);
  }, [productsInCart.length, totalPrice, productsInCart]);

  return (
    <CartContext.Provider
      value={[
        productsQuantity,
        setproductsQuantity,
        productsInCart,
        setProductsInCart,
        totalPrice,
      ]}
    >
      {children}
    </CartContext.Provider>
  );
};
