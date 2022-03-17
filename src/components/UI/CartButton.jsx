import { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../../store/cart-context";

import Button from "./Button";

import { BsCart4 } from "react-icons/bs";
import styles from "./styles/CartButton.module.css";

const Cart = ({ onClick }) => {
  const [productsQuantity, setproductsQuantity] = useContext(CartContext);

  return (
    <Link to="/cart">
      <Button
        buttonText={<BsCart4 style={{ color: "white" }} />}
        onClick={onClick}
        className={styles.button}
      >
        <span className={styles.badge}>{productsQuantity}</span>
      </Button>
    </Link>
  );
};

export default Cart;
