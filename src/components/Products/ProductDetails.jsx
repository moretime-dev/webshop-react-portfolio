import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../store/products-context.js";
import { CartContext } from "./../../store/cart-context";

import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./styles/ProductDetails.module.css";

const ProductDetails = () => {
  const [
    productsQuantity,
    setproductsQuantity,
    productsInCart,
    setProductsInCart,
  ] = useContext(CartContext);
  const [productQuantity, setProductQuantity] = useState(1);

  const [products, setProducts] = useContext(ProductsContext);
  const params = useParams();
  const id = params.id;

  const product = products.filter((product) => product.id === id);

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
    setproductsQuantity(productsQuantity + productQuantity);
    setProductQuantity(1);
    const productToAddToCart = { ...product, productQuantity };
    setProductsInCart([...productsInCart, productToAddToCart]);
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
              <p>{p.description}</p>
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
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default ProductDetails;
