import { useContext } from "react";
import { ProductsContext } from "../../store/products-context.js";

import ProductItem from "./ProductItem";
import FilterProducts from "../UI/FilterProducts.jsx";
import Pagination from "../UI/Pagination.jsx";

import LoadingSpinner from "../../assets/img/loadingSpinner.gif";

import styles from "./styles/ProductsList.module.css";

const ProductsList = () => {
  const [products, setProducts, filteredProducts] = useContext(ProductsContext);

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
          ) : filteredProducts.length === 0 ? (
            products.map((product) => {
              return <ProductItem key={product.id} product={product} />;
            })
          ) : (
            filteredProducts.map((product) => {
              return <ProductItem key={product.id} product={product} />;
            })
          )}
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default ProductsList;
