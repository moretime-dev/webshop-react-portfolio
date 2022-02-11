import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../store/products-context.js";

import styles from "./styles/ProductDetails.module.css";

const ProductDetails = () => {
  const [products, setProducts] = useContext(ProductsContext);
  const params = useParams();
  const id = params.id;

  const product = products.filter((product) => product.id === id);
  console.log(product);

  return (
    <div>
      {product.map((p) => {
        return <div key={p.id}>{p.name}</div>;
      })}
    </div>
  );
};

export default ProductDetails;
