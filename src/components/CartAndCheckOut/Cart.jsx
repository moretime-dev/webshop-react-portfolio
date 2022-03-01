import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../store/cart-context";

import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./styles/Cart.module.css";

const Cart = () => {
  const navigate = useNavigate();

  const [
    productsQuantity,
    setproductsQuantity,
    productsInCart,
    setProductsInCart,
    totalPrice,
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

    currentProduct[0].productQuantity = productQuantity + 1;

    setProductsInCart([...productsInCart]);
  };

  const onDeleteProductFromCartHandler = (id) => {
    const updatedProductsInCart = productsInCart.filter(
      (product) => product[0].id !== id
    );
    setProductsInCart([...updatedProductsInCart]);
  };

  const onGoToCheckoutClickHandler = () => {
    navigate("/checkout");
  };

  return (
    <Card className={styles.cartCard}>
      <div>
        {productsInCart.length === 0 ? (
          <span>No Products In Cart</span>
        ) : (
          productsInCart.map((product) => (
            <div className={styles.cartProductContainer} key={product[0].id}>
              <Link
                to={`/products/${product[0].id}`}
                className={styles.cartProductInfoContainer}
              >
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
                    €{(product[0].price * product.productQuantity).toFixed(2)}
                  </span>{" "}
                </div>
              </Link>

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

              <span
                className={styles.cartDeleteProduct}
                onClick={() => onDeleteProductFromCartHandler(product[0].id)}
              >
                X
              </span>
            </div>
          ))
        )}
      </div>
      <div className={styles.cartTotalPrice}>
        <span> TOTAL: €{totalPrice.toFixed(2)}</span>
      </div>
      <div className={styles.cardCheckoutButton}>
        <Button
          buttonText="Go To Checkout"
          onClick={onGoToCheckoutClickHandler}
        />
      </div>
    </Card>
  );
};

export default Cart;
