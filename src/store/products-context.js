import React, { useState } from "react";

export const ProductsContext = React.createContext();

export const ProductsProvider = () => {
  const [products, setProducts] = useState([]);

  return null;
};
