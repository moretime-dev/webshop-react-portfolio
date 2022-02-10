import styles from "./styles/Header.module.css";
import { SiActigraph } from "react-icons/si";

import Nav from "./Nav";
import Cart from "./Cart";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <div className={styles.logoContainer}>
          <span className={styles.logo}>
            {" "}
            <SiActigraph />
          </span>
          <span className={styles.companyName}> WeShop</span>
        </div>
        <Nav />
        <Cart />
      </div>
    </header>
  );
};

export default Header;
