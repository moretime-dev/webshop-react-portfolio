import { Link } from "react-router-dom";

import Button from "./Button";

import { BsCart4 } from "react-icons/bs";
import styles from "./styles/Cart.module.css";

const Cart = () => {
  return (
    <Link to="/cart">
      <Button
        buttonText={<BsCart4 style={{ color: "white" }} />}
        className={styles.button}
      >
        <span className={styles.badge}>0</span>
      </Button>
    </Link>
  );
};

export default Cart;
