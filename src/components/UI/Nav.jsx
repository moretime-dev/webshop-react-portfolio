import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../store/auth-context";
import { ProductsContext } from "../../store/products-context";
import { ParamsContext } from "../../store/params-context";

import { AiOutlineHome, AiOutlineFileAdd } from "react-icons/ai";
import { FiSmile, FiPercent } from "react-icons/fi";

import styles from "./styles/Nav.module.css";

const Nav = () => {
  const [category, setCategory, pageNumber, setPageNumber] =
    useContext(ParamsContext);

  const [currentUserRole, currentUserIsLoggedIn] = useContext(AuthContext);
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

  const onProductsLinkClickHandler = () => {
    setFilteredProducts(products.slice(0, 9));
    // setProductsPerPage([]);
    setProductsOnSale(false);
    setPageNumber(1);
    setCategory("all");
  };

  return (
    <ul className={styles.navContainer}>
      <li>
        <NavLink to="/" className={styles.navLink}>
          <span className={styles.symbol}>
            {" "}
            <AiOutlineHome />
          </span>{" "}
          <span className={styles.linkName}>HOME</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/products/category/${category}/1`}
          className={styles.navLink}
        >
          <span className={styles.symbol}>
            {" "}
            <FiSmile />
          </span>{" "}
          <span
            className={styles.linkName}
            onClick={onProductsLinkClickHandler}
          >
            {" "}
            PRODUCTS
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/sale" className={styles.navLink}>
          <span className={styles.symbol}>
            {" "}
            <FiPercent />
          </span>{" "}
          <span className={styles.linkName}> SALE</span>
        </NavLink>
      </li>

      {currentUserIsLoggedIn && currentUserRole === "admin" && (
        <li>
          {" "}
          <NavLink to="/add-product" className={styles.navLink}>
            <span className={styles.symbol}>
              {" "}
              <AiOutlineFileAdd />{" "}
            </span>{" "}
            <span className={styles.linkName}> ADD PRODUCT</span>
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default Nav;
