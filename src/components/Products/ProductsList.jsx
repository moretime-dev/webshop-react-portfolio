import { useContext } from "react";
import { ProductsContext } from "../../store/products-context.js";

import ProductItem from "./ProductItem";
import FilterProducts from "../UI/FilterProducts.jsx";

import styles from "./styles/ProductsList.module.css";

const ProductsList = () => {
  const [products] = useContext(ProductsContext);

  return (
    <div>
      <FilterProducts />
      <div className={styles.productListContainerWrapper}>
        <div className={styles.productListContainer}>
          {products.length === 0 ? (
            <h1>No Products Found</h1>
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
