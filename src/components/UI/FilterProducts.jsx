import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import { ProductsContext } from "../../store/products-context.js";

import styles from "./styles/FilterProducts.module.css";

const FilterProducts = () => {
  const [products, setProducts, filteredProducts, setFilteredProducts] =
    useContext(ProductsContext);

  const params = useParams();

  const categoryFromParams = params.category || "all";
  const filterFromParams = params.filter || "none";

  console.log(categoryFromParams, filterFromParams);

  const filterCategories = [
    "all",
    "accessoires",
    "clothes",
    "electronics",
    "shoes",
    "travel",
  ];

  const onFilterCategoryHandler = (currentCategory) => {
    const productsToFilter = [...products];

    let currentFilteredProducts = [];

    if (currentCategory === "all") {
      currentFilteredProducts = products;
    } else {
      currentFilteredProducts = productsToFilter.filter(
        (product) => product.category === currentCategory
      );
    }

    setFilteredProducts(currentFilteredProducts);
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
          <Link to={`/products/${category}`} key={category}>
            <span
              className={styles.category}
              onClick={() => onFilterCategoryHandler(category)}
            >
              {category}
            </span>
          </Link>
        );
      })}
      <div>
        <Link to={`/products/${categoryFromParams}/latest`}>
          <span
            className={styles.subFilter}
            onClick={onLatestProductFilterHandler}
          >
            Latest |
          </span>
        </Link>
        <Link to={`/products/${categoryFromParams}/oldest`}>
          <span
            className={styles.subFilter}
            onClick={onOldestProductFilterHandler}
          >
            Oldest |
          </span>
        </Link>
        <Link to={`/products/${categoryFromParams}/least-expensive`}>
          <span
            className={styles.subFilter}
            onClick={onLeastExpensiveProductFilterHandler}
          >
            Least Expensive |
          </span>
        </Link>
        <Link to={`/products/${categoryFromParams}/most-expensive`}>
          <span
            className={styles.subFilter}
            onClick={onMostExpensiveProductFilterHandler}
          >
            Most Expensive |
          </span>
        </Link>
        <Link to={`/products/${categoryFromParams}/names-asc`}>
          <span
            className={styles.subFilter}
            onClick={onAscendingAlphaBeticProductFilterHandler}
          >
            [A-Z] |
          </span>
        </Link>
        <Link to={`/products/${categoryFromParams}/names-desc`}>
          <span
            className={styles.subFilter}
            onClick={onDescendingAlphabeticProductFilterHandler}
          >
            [Z-A]
          </span>
        </Link>
      </div>
    </div>
  );
};

export default FilterProducts;
