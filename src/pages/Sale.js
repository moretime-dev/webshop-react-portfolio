import { useContext, useEffect } from "react";
import { ProductsContext } from "../store/products-context";

import ProductsList from "../components/Products/ProductsList";

const Sale = () => {
  const [products, setProducts, filteredProducts, setFilteredProducts] =
    useContext(ProductsContext);

  useEffect(() => {
    const productsCopy = [...products];

    const productsOnSale = productsCopy.filter(
      (product) => product.onSale === "yes"
    );

    setFilteredProducts(productsOnSale);
  }, [products, setFilteredProducts]);

  return <ProductsList />;
};

export default Sale;
