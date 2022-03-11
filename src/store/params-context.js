import React, { useState, useEffect } from "react";

export const ParamsContext = React.createContext();

export const ParamsProvider = ({ children }) => {
  const [category, setCategory] = useState("all");
  const [pageNumber, setPageNumber] = useState(1);

  //   useEffect(() => {
  //     setproductsQuantity(productsInCart.length);
  //     let currentTotal = 0;
  //     productsInCart.forEach((product) => {
  //       currentTotal += product[0].price * product.productQuantity;
  //     });
  //     setTotalPrice(currentTotal);
  //   }, [productsInCart.length, totalPrice, productsInCart]);

  return (
    <ParamsContext.Provider
      value={[category, setCategory, pageNumber, setPageNumber]}
    >
      {children}
    </ParamsContext.Provider>
  );
};
