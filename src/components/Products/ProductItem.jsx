import { Link } from "react-router-dom";

import Card from "../UI/Card";

import styles from "./styles/ProductItem.module.css";

const ProductItem = (props) => {
  const { category, description, discount, imgPath, name, onSale, price, id } =
    props.product;

  return (
    <Link to={`/products/${id}`}>
      <Card className={styles.card}>
        <div className={styles.productContainer}>
          <div className={styles.imgContainer}>
            <img src={imgPath} alt={name} className={styles.img} />
          </div>
          <div className={styles.infoContainer}>
            {" "}
            <h4>{name}</h4>
            <span>{category}</span>
            <span>€{price.toFixed(2)}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductItem;
