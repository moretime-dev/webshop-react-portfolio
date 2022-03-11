import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../store/products-context";

import ProductsList from "../Products/ProductsList";
import Button from "../UI/Button";

import styles from "./styles/Pagination.module.css";

const Pagination = ({ onSetCurrentProducts }) => {
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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  const [pageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];

  console.log(productsPerPage);

  if (productsPerPage.length === 0) {
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
      pages.push(i);
    }
  } else {
    for (
      let i = 1;
      i <= Math.ceil(filteredProducts.length / itemsPerPage);
      i++
    ) {
      pages.push(i);
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    //  setCurrentItems(products.slice(indexOfFirstItem, indexOfLastItem));
    onSetCurrentProducts(products.slice(indexOfFirstItem, indexOfLastItem));
  }, [indexOfFirstItem, indexOfLastItem, products, onSetCurrentProducts]);

  const onHandlePageSelect = (page) => {
    setCurrentPage(page);
  };

  const onPrevPageHandler = () => {
    if (currentPage - 1 === 0) return;
    setCurrentPage((prev) => prev - 1);
    //  props.onSetPages(currentItems);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const onNextPageHandler = () => {
    if (currentPage + 1 > pages.length) return;
    setCurrentPage((prev) => prev + 1);
    //  props.onSetPages(currentItems);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const renderPageNumbers = pages.map((page) => {
    if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
      return (
        <Link to={`/products/pages/${page}`} key={page}>
          <Button
            onClick={() => onHandlePageSelect(page)}
            className={currentPage === page && styles.active}
          >
            {page}
          </Button>
        </Link>
      );
    } else return null;
  });

  return (
    <div className={styles.paginationContainer}>
      <Link
        to={`/products/pages/${
          currentPage - 1 === 0 ? currentPage : currentPage - 1
        }`}
      >
        <Button buttonText="PREV" onClick={onPrevPageHandler} />
      </Link>
      {renderPageNumbers}
      <Link
        to={`/products/pages/${
          currentPage + 1 > pages.length ? currentPage : currentPage + 1
        }`}
      >
        <Button buttonText="NEXT" onClick={onNextPageHandler} />
      </Link>
    </div>
  );
};

export default Pagination;
