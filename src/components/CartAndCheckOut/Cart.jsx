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

  const onProductQuantityDecreaseHandler = (productQuantity, id) => {
    let currentProduct = productsInCart.filter(
      (product) => product[0].id === id
    );

    if (currentProduct[0].productQuantity === 1) {
      const updatedProductsInCart = productsInCart.filter(
        (product) => product[0].id !== id
      );
      setProductsInCart([...updatedProductsInCart]);
    } else {
      currentProduct[0].productQuantity = productQuantity - 1;
      setProductsInCart([...productsInCart]);
    }
  };

  const onProductQuantityIncreaseHandler = (productQuantity, id) => {
    let currentProduct = productsInCart.filter(
      (product) => product[0].id === id
    );

    if (currentProduct[0].productQuantity === 1) {
      return;
    } else {
      currentProduct[0].productQuantity = productQuantity + 1;
    }

    setProductsInCart([...productsInCart]);
  };

  return (
    <Card className={styles.cartCard}>
      <div>
        {productsInCart.length === 0 ? (
          <span>No Products In Cart</span>
        ) : (
          productsInCart.map((product) => (
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
                    className={styles.cartProductQuantity}
                  />
                  <Button
                    buttonText="-"
                    onClick={() =>
                      onProductQuantityDecreaseHandler(
                        product.productQuantity,
                        product[0].id
                      )
                    }
                    className={styles.cartButton}
                  />
                  <Button
                    buttonText="+"
                    onClick={() =>
                      onProductQuantityIncreaseHandler(
                        product.productQuantity,
                        product[0].id
                      )
                    }
                    className={styles.cartButton}
                  />
                </div>
              </div>
              <span className={styles.cartDeleteProduct}>X</span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default Cart;
