import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductsContext } from "../../store/products-context.js";
import { CartContext } from "./../../store/cart-context";
import { AuthContext } from "./../../store/auth-context";

import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./styles/ProductDetails.module.css";

const ProductDetails = () => {
  const [productQuantity, setProductQuantity] = useState(1);

  const [loginPrompt, setLoginPrompt] = useState("");

  const [
    productsQuantity,
    setproductsQuantity,
    productsInCart,
    setProductsInCart,
  ] = useContext(CartContext);

  const [currentUserRole, currentUserIsLoggedIn] = useContext(AuthContext);

  const navigate = useNavigate();

  const [products, setProducts] = useContext(ProductsContext);
  const params = useParams();
  const id = params.id;

  const product = products.filter((product) => product.id === id);

  const cartItem = productsInCart.filter((product) => product[0].id === id);

  const onProductQuantityDecreaseHandler = () => {
    if (productQuantity === 1) {
      return;
    } else {
      setProductQuantity((prev) => prev - 1);
    }
  };
  const onProductQuantityIncreaseHandler = () => {
    setProductQuantity((prev) => prev + 1);
  };

  const onProductAddToCartHandler = (event) => {
    event.preventDefault();

    if (currentUserIsLoggedIn && currentUserRole === "user") {
      if (productsInCart.length === 0) {
        const productToAddToCart = { ...product, productQuantity };
        setProductsInCart([productToAddToCart]);
      } else {
        productsInCart.forEach((productInCart) => {
          if (productInCart[0].id === id) {
            productInCart.productQuantity += productQuantity;
          } else if (cartItem.length === 0) {
            const productToAddToCart = { ...product, productQuantity };

            setProductsInCart([...productsInCart, productToAddToCart]);
          }
        });
      }

      setProductQuantity(1);
    } else if (currentUserIsLoggedIn && currentUserRole === "admin") {
      setLoginPrompt("Admin can not add products to cart.");
    } else {
      setLoginPrompt("Please log in to add products to your cart.");
    }
  };

  const onEditProductClickHandler = (id) => {
    navigate(`/products/edit-product/${id}`);
  };

  return (
    <Card className={styles.productDetailsCard}>
      {product.map((p) => {
        return (
          <div key={p.id} className={styles.productDetailsContainer}>
            <div className={styles.productImageContainer}>
              <img
                src={p.imgPath}
                alt={p.name}
                className={styles.productImage}
              />
            </div>
            <div className={styles.productDetailsTextContainer}>
              <div className={styles.productTitleAndCategoryContainer}>
                {" "}
                <h3>{p.name}</h3>
                <h5>{p.category}</h5>
              </div>
              <p> {p.description}</p>
              <p className={styles.productDetailsLoginPrompt}>
                <i>{loginPrompt}</i>{" "}
              </p>
              <div
                className={styles.productDetailsPriceQuantityAddToCartContainer}
              >
                €{p.price.toFixed(2)}
                <input
                  type="number"
                  value={productQuantity}
                  className={styles.productDetailsQuantity}
                  readOnly
                />
                <Button
                  buttonText="-"
                  onClick={onProductQuantityDecreaseHandler}
                />
                <Button
                  buttonText="+"
                  onClick={onProductQuantityIncreaseHandler}
                />
                <Button
                  buttonText="Add To Cart"
                  onClick={onProductAddToCartHandler}
                />
              </div>
              {currentUserIsLoggedIn && currentUserRole === "admin" ? (
                <div className={styles.adminButtonsContainer}>
                  {" "}
                  <Button
                    buttonText="Edit Product"
                    className={styles.editButton}
                    onClick={() => onEditProductClickHandler(p.id)}
                  />{" "}
                  <Button
                    buttonText="Delete Product"
                    className={styles.deleteButton}
                  />{" "}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default ProductDetails;
