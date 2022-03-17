import { useState } from "react";

import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "../../store/auth-context";
import { ProductsContext } from "../../store/products-context";
import { ParamsContext } from "../../store/params-context";

import CartButton from "../UI/CartButton";

import { AiOutlineHome, AiOutlineFileAdd } from "react-icons/ai";
import { FiSmile, FiPercent } from "react-icons/fi";

import styles from "./styles/MobileNav.module.css";

const MobileNav = () => {
  const [mobileNavIsVisible, setMobileNavIsVisible] = useState(false);

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

  const navigate = useNavigate();

  const onLogoutHandler = (event) => {
    event.preventDefault();

    localStorage.removeItem("currentUser");
    setMobileNavIsVisible(!mobileNavIsVisible);
    setTimeout(() => navigate("/"), 200);
    setTimeout(() => window.location.reload(), 500);
  };

  const onMobileLinkClickHandler = () => {
    setMobileNavIsVisible(!mobileNavIsVisible);
  };

  const onProductsLinkClickHandler = () => {
    setFilteredProducts(products.slice(0, 9));
    // setProductsPerPage([]);
    setProductsOnSale(false);
    setPageNumber(1);
    setCategory("all");
    setMobileNavIsVisible(!mobileNavIsVisible);
  };

  const onMenuBurgerClickHandler = () => {
    setMobileNavIsVisible(!mobileNavIsVisible);
  };

  return (
    <div className={styles.mobileNavContainer}>
      {!mobileNavIsVisible ? (
        <p
          className={styles.mobileNavBurger}
          onClick={onMenuBurgerClickHandler}
        >
          <svg viewBox="0 0 100 80" width="40" height="40">
            <rect width="100" height="10"></rect>
            <rect y="30" width="100" height="10"></rect>
            <rect y="60" width="100" height="10"></rect>
          </svg>
        </p>
      ) : (
        <p className={styles.mobileNavClose} onClick={onMenuBurgerClickHandler}>
          X
        </p>
      )}

      {mobileNavIsVisible && (
        <div className={styles.mobileNavOverlay}>
          <ul className={styles.navContainer}>
            <li>
              <NavLink to="/" className={styles.navLink}>
                <span className={styles.symbol}>
                  {" "}
                  <AiOutlineHome />
                </span>{" "}
                <span
                  className={styles.linkName}
                  onClick={onMobileLinkClickHandler}
                >
                  HOME
                </span>
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
                <span
                  className={styles.linkName}
                  onClick={onMobileLinkClickHandler}
                >
                  {" "}
                  SALE
                </span>
              </NavLink>
            </li>

            {currentUserIsLoggedIn && currentUserRole === "admin" && (
              <li>
                {" "}
                <NavLink
                  to="/add-product"
                  onClick={onMobileLinkClickHandler}
                  className={styles.navLink}
                >
                  <span className={styles.symbol}>
                    {" "}
                    <AiOutlineFileAdd />{" "}
                  </span>{" "}
                  <span className={styles.linkName}> ADD PRODUCT</span>
                </NavLink>
              </li>
            )}
          </ul>{" "}
          <div className={styles.userFunctionsContainer}>
            <CartButton onClick={onMobileLinkClickHandler} />
            {currentUserIsLoggedIn && currentUserRole === "user" ? (
              <div className={styles.userHandling}>
                <Link
                  to="/user-profile"
                  className={styles.userHandlingLink}
                  onClick={onMobileLinkClickHandler}
                >
                  My Profile
                </Link>
                <Link
                  to="/"
                  className={styles.userHandlingLink}
                  onClick={onLogoutHandler}
                >
                  Logout
                </Link>
              </div>
            ) : currentUserIsLoggedIn && currentUserRole === "admin" ? (
              <Link
                to="/"
                className={styles.userHandlingLink}
                onClick={onLogoutHandler}
              >
                Logout
              </Link>
            ) : (
              <div className={styles.userHandling}>
                <Link
                  to="/add-new-user"
                  onClick={onMobileLinkClickHandler}
                  className={styles.userHandlingLink}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login-user"
                  onClick={onMobileLinkClickHandler}
                  className={styles.userHandlingLink}
                >
                  Login
                </Link>
              </div>
            )}{" "}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
