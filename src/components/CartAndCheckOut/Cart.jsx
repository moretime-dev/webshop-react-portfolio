import { useContext } from "react";
import { CartContext } from "../../store/cart-context";

import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./styles/Cart.module.css";

const Cart = () => {
  const [
    productsQuantity,
    setproductsQuantity,
    productsInCart,
    setProductsInCart,
  ] = useContext(CartContext);

  const onProductQuantityChangeHandler = (event) => {};

  const onProductQuantityDecreaseHandler = () => {};
  const onProductQuantityIncreaseHandler = () => {};

  console.log(productsInCart);
  return (
    <Card className={styles.cartCard}>
      <div>
        {productsInCart.map((product) => (
          <div className={styles.cartProductContainer} key={product[0].id}>
            <div className={styles.cartImageContainer}>
              <img
                src={product[0].imgPath}
                alt={product[0].name}
                className={styles.cartImage}
              />
            </div>
            <div className={styles.cartProductInfoContainer}>
              <span className={styles.cartProductInfoElement}>
                {product[0].name}
              </span>
              <span className={styles.cartProductInfoElement}>
                €{product[0].price.toFixed(2)}
              </span>
              <div className={styles.cartQuantity}>
                <input
                  type="number"
                  readOnly
                  value={product.productQuantity}
                  onChange={onProductQuantityChangeHandler}
                  className={styles.cartProductQuantity}
                />
                <Button
                  buttonText="-"
                  onClick={onProductQuantityDecreaseHandler}
                  className={styles.cartButton}
                />
                <Button
                  buttonText="+"
                  onClick={onProductQuantityIncreaseHandler}
                  className={styles.cartButton}
                />
              </div>
            </div>
            <span className={styles.cartDeleteProduct}>X</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Cart;
