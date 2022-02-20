import { useContext } from "react";
import { CartContext } from "../store/cart-context";

const CartPage = () => {
  const [
    productsQuantity,
    setproductsQuantity,
    productsInCart,
    setProductsInCart,
  ] = useContext(CartContext);

  console.log(productsInCart);

  return <h1>CART</h1>;
};

export default CartPage;
