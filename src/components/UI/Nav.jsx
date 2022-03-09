import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../store/auth-context";
import { ProductsContext } from "../../store/products-context";

import { AiOutlineHome, AiOutlineFileAdd } from "react-icons/ai";
import { FiSmile, FiPercent } from "react-icons/fi";

import styles from "./styles/Nav.module.css";

const Nav = () => {
  const [currentUserRole, currentUserIsLoggedIn] = useContext(AuthContext);
  const [
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
    productsOnSale,
    setProductsOnSale,
  ] = useContext(ProductsContext);

  // console.log(
  //   "Is logged in: " + currentUserIsLoggedIn,
  //   "Role: " + currentUserRole
  // );

  const onProductsLinkClickHandler = () => {
    setFilteredProducts([]);
    setProductsOnSale(false);
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
        <NavLink to="/products" className={styles.navLink}>
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
