import { useContext, useState } from "react";
import { ProductsContext } from "../../store/products-context.js";

import styles from "./styles/FilterProducts.module.css";

const FilterProducts = () => {
  const [products, setProducts, filteredProducts, setFilteredProducts] =
    useContext(ProductsContext);

  const filterCategories = [
    "all",
    "accessoires",
    "clothes",
    "electronics",
    "shoes",
    "travel",
  ];

  const onFilterCategoryHandler = (category) => {
    const productsToFilter = [...products];

    let currentFilteredProducts = [];

    if (category === "all") {
      currentFilteredProducts = products;
    } else {
      currentFilteredProducts = productsToFilter.filter(
        (product) => product.category === category
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
          <span
            key={category}
            className={styles.category}
            onClick={() => onFilterCategoryHandler(category)}
          >
            {category}
          </span>
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
