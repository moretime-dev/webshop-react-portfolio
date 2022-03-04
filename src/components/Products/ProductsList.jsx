import { useContext } from "react";
import { ProductsContext } from "../../store/products-context.js";

import ProductItem from "./ProductItem";
import FilterProducts from "../UI/FilterProducts.jsx";

import LoadingSpinner from "../../assets/img/loadingSpinner.gif";

import styles from "./styles/ProductsList.module.css";

const ProductsList = () => {
  const [products] = useContext(ProductsContext);

  return (
    <div>
      <FilterProducts />
      <div className={styles.productListContainerWrapper}>
        <div className={styles.productListContainer}>
          {products.length === 0 ? (
            <img
              src={LoadingSpinner}
              alt="loading..."
              className={styles.loadingSpinner}
            />
          ) : (
            products.map((product) => {
              return <ProductItem key={product.id} product={product} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
