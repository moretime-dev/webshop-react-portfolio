import { Link } from "react-router-dom";

import styles from "./styles/Header.module.css";
import { SiActigraph } from "react-icons/si";

import Nav from "./Nav";
import Cart from "./Cart";

const Header = () => {
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
        <Cart />
        <div className={styles.userHandling}>
          <Link to="/add-new-user" className={styles.userHandlingLink}>
            Sign Up
          </Link>
          <Link to="/login-user" className={styles.userHandlingLink}>
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
