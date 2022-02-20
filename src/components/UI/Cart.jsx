import { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "./../../store/cart-context";

import Button from "./Button";

import { BsCart4 } from "react-icons/bs";
import styles from "./styles/Cart.module.css";

const Cart = () => {
  const [productsQuantity, setproductsQuantity] = useContext(CartContext);

  return (
    <Link to="/cart">
      <Button
        buttonText={<BsCart4 style={{ color: "white" }} />}
        className={styles.button}
      >
        <span className={styles.badge}>{productsQuantity}</span>
      </Button>
    </Link>
  );
};

export default Cart;
