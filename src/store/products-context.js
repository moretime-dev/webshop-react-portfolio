import React, { useState, useEffect } from "react";

import { db } from "../firebase_config";
import { collection, getDocs } from "firebase/firestore";

export const ProductsContext = React.createContext();

const productsCollection = collection(db, "products");
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProductsFromFireBase = async () => {
      const data = await getDocs(productsCollection);

      const productsArray = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setProducts(productsArray);
    };

    fetchProductsFromFireBase();
  }, []);

  return (
    <ProductsContext.Provider
      value={[products, setProducts, filteredProducts, setFilteredProducts]}
    >
      {children}
    </ProductsContext.Provider>
  );
};
