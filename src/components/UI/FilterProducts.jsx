import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ProductsContext } from "../../store/products-context.js";
import { ParamsContext } from "../../store/params-context.js";

import styles from "./styles/FilterProducts.module.css";

const FilterProducts = () => {
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

  const [category, setCategory, pageNumber, setPageNumber] =
    useContext(ParamsContext);

  const [productsToFilter, setProductsToFilter] = useState([]);

  const navigate = useNavigate();

  const { category: paramsCategory } = useParams();

  const categoryFromParams = paramsCategory || category;
  // const filterFromParams = params.filter || "none";

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
  }, [products, filteredProducts, productsOnSale, setCategory]);

  const onFilterCategoryHandler = (currentCategory) => {
    let currentFilteredProducts = [];

    navigate(`/products/category/${currentCategory}/${pageNumber}`);

    setCategory(currentCategory);

    // if (productsOnSale) {
    //   if (paramsCategory === "all") {
    //     setProductsPerPage([]);
    //     setFilteredProducts(productsToFilter.slice(0, 9));
    //   } else {
    //     currentFilteredProducts = productsToFilter.filter(
    //       (product) => product.category === paramsCategory
    //     );
    //     setProductsPerPage(currentFilteredProducts);
    //     setFilteredProducts(currentFilteredProducts);
    //   }
    // } else {}
    if (categoryFromParams === "all") {
      setProductsPerPage(productsToFilter.slice(0, 9));
      setFilteredProducts([]);
      setPageNumber(1);
    } else {
      currentFilteredProducts = productsToFilter.filter(
        (product) => product.category === categoryFromParams
      );
      // setProductsPerPage(currentFilteredProducts);
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
    <div className={styles.allFiltersContainer}>
      <div className={styles.filterContainer}>
        {filterCategories.map((category) => {
          return (
            <div key={category}>
              <span
                key={category}
                className={styles.category}
                onClick={() => onFilterCategoryHandler(category)}
              >
                {category}
              </span>
            </div>
          );
        })}
      </div>
      <div className={styles.subCategoriesContainer}>
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
    </div>
  );
};

export default FilterProducts;
