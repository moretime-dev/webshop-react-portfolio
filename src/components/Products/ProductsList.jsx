import { useContext, useCallback } from "react";
import { ProductsContext } from "../../store/products-context.js";

import ProductItem from "./ProductItem";
import FilterProducts from "../UI/FilterProducts.jsx";
import Pagination from "../UI/Pagination.jsx";

import LoadingSpinner from "../../assets/img/loadingSpinner.gif";

import styles from "./styles/ProductsList.module.css";

const ProductsList = () => {
  const [
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
    productsOnSale,
    setProductsOnSale,
    productsPerPage,
    setProductsPerPage,
  ] = useContext(ProductsContext);

  const onSetCurrentProductsHandler = useCallback(
    (currentProducts) => {
      setFilteredProducts(currentProducts);
    },
    [setFilteredProducts]
  );

  return (
    <div>
      <FilterProducts onSetCurrentProducts={onSetCurrentProductsHandler} />
      <Pagination onSetCurrentProducts={onSetCurrentProductsHandler} />
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
    </div>
  );
};

export default ProductsList;
