import { NavLink } from "react-router-dom";

import { AiOutlineHome, AiOutlineFileAdd } from "react-icons/ai";
import { FiSmile } from "react-icons/fi";

import styles from "./styles/Nav.module.css";

const Nav = () => {
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
          <span className={styles.linkName}> PRODUCTS</span>
        </NavLink>
      </li>
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
    </ul>
  );
};

export default Nav;
