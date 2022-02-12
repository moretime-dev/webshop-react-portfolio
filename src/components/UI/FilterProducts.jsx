import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../../store/products-context.js";

import { db } from "../../firebase_config";
import { collection, getDocs } from "firebase/firestore";

import styles from "./styles/FilterProducts.module.css";

const productsCollection = collection(db, "products");
const FilterProducts = () => {
  const [products, setProducts] = useContext(ProductsContext);

  const filterCategories = [
    "all",
    "accessoires",
    "clothes",
    "electronics",
    "shoes",
    "travel",
  ];

  const onFilterCategoryHandler = async (category) => {
    const productsToFilter = await getDocs(productsCollection);

    const productsArray = productsToFilter.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    let filteredProducts = [];

    if (category === "all") {
      filteredProducts = productsArray;
    } else {
      filteredProducts = productsArray.filter(
        (product) => product.category === category
      );
    }

    setProducts(filteredProducts);
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
    </div>
  );
};

export default FilterProducts;
