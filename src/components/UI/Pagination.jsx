import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductsContext } from "../../store/products-context";
import { ParamsContext } from "../../store/params-context";

import ProductsList from "../Products/ProductsList";
import Button from "../UI/Button";

import styles from "./styles/Pagination.module.css";

const Pagination = () => {
  const navigate = useNavigate();

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

  const [pages, setPages] = useState([]);

  const [itemsPerPage] = useState(9);

  const [pageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  useEffect(() => {
    let pages = [];
    // console.log(filteredProducts);
    // if (filteredProducts.length !== 0) {
    //   for (
    //     let i = 1;
    //     i <= Math.ceil(filteredProducts.length / itemsPerPage);
    //     i++
    //   ) {
    //     pages.push(i);
    //   }
    // } else {
    //   for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    //     pages.push(i);
    //   }
    // }

    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
      pages.push(i);
      setPages(pages);
    }
  }, [itemsPerPage, products]);

  useEffect(() => {
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setFilteredProducts(products.slice(indexOfFirstItem, indexOfLastItem));
  }, [products, setFilteredProducts, itemsPerPage, pageNumber]);

  const onHandlePageSelect = (page) => {
    setPageNumber(page);
    navigate(`/products/category/${category}/${page}`);
  };

  const onPrevPageHandler = () => {
    if (pageNumber - 1 === 0) return;
    setPageNumber((prev) => prev - 1);

    if ((pageNumber - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const onNextPageHandler = () => {
    console.log(pages);
    if (pageNumber + 1 > pages.length) return;
    setPageNumber((prev) => prev + 1);

    if (pageNumber + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const renderPageNumbers = pages.map((page) => {
    if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
      return (
        <Button
          key={page}
          onClick={() => onHandlePageSelect(page)}
          className={`${pageNumber === page && styles.active} ${
            styles.pageButton
          }`}
        >
          {page}
        </Button>
      );
    } else return null;
  });

  return (
    <div className={styles.paginationContainer}>
      <Link
        to={`/products/category/all/${
          pageNumber - 1 === 0 ? pageNumber : pageNumber - 1
        }`}
      >
        <Button buttonText="PREV" onClick={onPrevPageHandler} />
      </Link>
      {renderPageNumbers}
      <Link
        to={`/products/category/all/${
          pageNumber + 1 > pages.length ? pageNumber : pageNumber + 1
        }`}
      >
        <Button buttonText="NEXT" onClick={onNextPageHandler} />
      </Link>
    </div>
  );
};

export default Pagination;
