import { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";

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

  const { category: paramsCategory, page } = useParams();

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.category === paramsCategory)
    );
  }, [products, paramsCategory, setFilteredProducts]);

  console.log(page);

  return (
    <div>
      <FilterProducts />
      <Pagination />
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
