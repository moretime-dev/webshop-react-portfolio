import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../store/products-context";

import Button from "../UI/Button";

import styles from "./styles/Pagination.module.css";

const Pagination = () => {
  const [
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
    productsOnSale,
    setProductsOnSale,
  ] = useContext(ProductsContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];

  for (let i = 1; i < Math.ceil(products.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const onHandlePageSelect = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const onPrevPageHandler = () => {
    if (currentPage - 1 === 0) return;
    setCurrentPage((prev) => prev - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const onNextPageHandler = () => {
    if (currentPage + 1 > pages.length) return;
    setCurrentPage((prev) => prev + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const renderPageNumbers = pages.map((page) => {
    if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
      return (
        <Link to={`/products/${page}`} key={page}>
          <button
            id={page}
            onClick={onHandlePageSelect}
            className={currentPage === page && styles.active}
          >
            {page}
          </button>
        </Link>
      );
    } else return null;
  });

  return (
    <div>
      <Button buttonText="PREV" onClick={onPrevPageHandler} />
      {renderPageNumbers}
      <Button buttonText="NEXT" onClick={onNextPageHandler} />
    </div>
  );
};

export default Pagination;
