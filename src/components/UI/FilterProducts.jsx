import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import { ProductsContext } from "../../store/products-context.js";

import styles from "./styles/FilterProducts.module.css";

const FilterProducts = ({ onSetCurrentProducts }) => {
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

  const [productsToFilter, setProductsToFilter] = useState([]);

  const params = useParams();

  const categoryFromParams = params.category || "all";
  const filterFromParams = params.filter || "none";

  // console.log(categoryFromParams, filterFromParams);

  const filterCategories = [
    "all",
    "accessoires",
    "clothes",
    "electronics",
    "shoes",
    "travel",
  ];

  useEffect(() => {
    const currentProductsToFilter = !productsOnSale
      ? [...products]
      : [...filteredProducts];

    setProductsToFilter(currentProductsToFilter);

    // console.log(currentProductsToFilter);
  }, [products, filteredProducts, productsOnSale]);

  const onFilterCategoryHandler = (currentCategory) => {
    let currentFilteredProducts = [];

    if (currentCategory === "all") {
      currentFilteredProducts = products;
      setProductsPerPage([]);
      setFilteredProducts(products.slice(0, 9));
    } else {
      currentFilteredProducts = productsToFilter.filter(
        (product) => product.category === currentCategory
      );
      setProductsPerPage(currentFilteredProducts);
      setFilteredProducts(currentFilteredProducts);
    }
  };

  const onLatestProductFilterHandler = () => {
    let productsToSort = [];

    if (filteredProducts.length === 0) {
      productsToSort = [...products];
    } else {
      productsToSort = [...filteredProducts];
    }

    const sortedProducts = productsToSort.sort((a, b) => b.date - a.date);

    setFilteredProducts(sortedProducts);
  };

  const onOldestProductFilterHandler = () => {
    let productsToSort = [];

    if (filteredProducts.length === 0) {
      productsToSort = [...products];
    } else {
      productsToSort = [...filteredProducts];
    }

    const sortedProducts = productsToSort.sort((a, b) => a.date - b.date);

    setFilteredProducts(sortedProducts);
  };

  const onLeastExpensiveProductFilterHandler = () => {
    let productsToSort = [];

    if (filteredProducts.length === 0) {
      productsToSort = [...products];
    } else {
      productsToSort = [...filteredProducts];
    }

    const sortedProducts = productsToSort.sort((a, b) => a.price - b.price);

    setFilteredProducts(sortedProducts);
  };

  const onMostExpensiveProductFilterHandler = () => {
    let productsToSort = [];

    if (filteredProducts.length === 0) {
      productsToSort = [...products];
    } else {
      productsToSort = [...filteredProducts];
    }

    const sortedProducts = productsToSort.sort((a, b) => b.price - a.price);

    setFilteredProducts(sortedProducts);
  };

  const onAscendingAlphaBeticProductFilterHandler = () => {
    let productsToSort = [];

    if (filteredProducts.length === 0) {
      productsToSort = [...products];
    } else {
      productsToSort = [...filteredProducts];
    }

    const sortedProducts = productsToSort.sort((a, b) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    setFilteredProducts(sortedProducts);
  };

  const onDescendingAlphabeticProductFilterHandler = () => {
    let productsToSort = [];

    if (filteredProducts.length === 0) {
      productsToSort = [...products];
    } else {
      productsToSort = [...filteredProducts];
    }

    const sortedProducts = productsToSort.sort((a, b) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x > y) {
        return -1;
      }
      if (x < y) {
        return 1;
      }
      return 0;
    });

    setFilteredProducts(sortedProducts);
  };

  return (
    <div className={styles.filterContainer}>
      {filterCategories.map((category) => {
        return (
          <Link to={`/products/category/${category}`} key={category}>
            <span
              key={category}
              className={styles.category}
              onClick={() => onFilterCategoryHandler(category)}
            >
              {category}
            </span>
          </Link>
        );
      })}
      <div>
        <span
          className={styles.subFilter}
          onClick={onLatestProductFilterHandler}
        >
          Latest |
        </span>
        <span
          className={styles.subFilter}
          onClick={onOldestProductFilterHandler}
        >
          Oldest |
        </span>
        <span
          className={styles.subFilter}
          onClick={onLeastExpensiveProductFilterHandler}
        >
          Least Expensive |
        </span>
        <span
          className={styles.subFilter}
          onClick={onMostExpensiveProductFilterHandler}
        >
          Most Expensive |
        </span>
        <span
          className={styles.subFilter}
          onClick={onAscendingAlphaBeticProductFilterHandler}
        >
          [A-Z] |
        </span>
        <span
          className={styles.subFilter}
          onClick={onDescendingAlphabeticProductFilterHandler}
        >
          [Z-A]
        </span>
      </div>
    </div>
  );
};

export default FilterProducts;
