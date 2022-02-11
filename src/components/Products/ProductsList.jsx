import { useContext } from "react";
import { ProductsContext } from "../../store/products-context.js";

import ProductItem from "./ProductItem";

import styles from "./styles/ProductsList.module.css";

const ProductsList = () => {
  const [products, setProducts] = useContext(ProductsContext);

  console.log(products);

  return (
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
  );
};

export default ProductsList;
