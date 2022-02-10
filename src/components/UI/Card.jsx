import React from "react";

import styles from "./styles/Card.module.css";

const Card = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className={`${styles.cardContainer} ${props.className}`}>
      {props.children}
    </div>
  );
});

export default Card;
