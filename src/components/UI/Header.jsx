import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";

import { Link, useNavigate } from "react-router-dom";

import styles from "./styles/Header.module.css";
import { SiActigraph } from "react-icons/si";

import Nav from "./Nav";
import CartButton from "./CartButton";

const Header = () => {
  const [currentUserRole, currentUserIsLoggedIn] = useContext(AuthContext);

  const navigate = useNavigate();

  const onLogoutHandler = (event) => {
    event.preventDefault();

    localStorage.removeItem("currentUser");
    setTimeout(() => navigate("/"), 200);
    setTimeout(() => window.location.reload(), 500);
  };

  const onUserDataClickHandler = () => {};

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <Link to="/">
          <div className={styles.logoContainer}>
            {" "}
            <span className={styles.logo}>
              {" "}
              <SiActigraph />
            </span>
            <span className={styles.companyName}> WeShop</span>
          </div>
        </Link>
        <Nav />
        <CartButton />
        {currentUserIsLoggedIn ? (
          <div className={styles.userHandling}>
            <Link
              to="/user-data"
              className={styles.userHandlingLink}
              onClick={onUserDataClickHandler}
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
        ) : (
          <div className={styles.userHandling}>
            <Link to="/add-new-user" className={styles.userHandlingLink}>
              Sign Up
            </Link>
            <Link to="/login-user" className={styles.userHandlingLink}>
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
