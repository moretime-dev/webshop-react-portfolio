import { useContext } from "react";

import { CartContext } from "../store/cart-context";

const CheckoutPage = () => {
  const [
    productsQuantity,
    setproductsQuantity,
    productsInCart,
    setProductsInCart,
    totalPrice,
  ] = useContext(CartContext);

  return <div>{totalPrice}</div>;
};

export default CheckoutPage;
