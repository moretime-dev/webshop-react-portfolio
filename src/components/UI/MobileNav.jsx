import { useState } from "react";

import styles from "./styles/MobileNav.module.css";

const MobileNav = () => {
  const [mobileNavIsVisible, setMobileNavIsVisible] = useState(false);

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
        <div className={styles.mobileNavOverlay}>MobileNav</div>
      )}
    </div>
  );
};

export default MobileNav;
