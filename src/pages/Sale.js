import { useContext, useEffect } from "react";
import { ProductsContext } from "../store/products-context";

import ProductsList from "../components/Products/ProductsList";

const Sale = () => {
  const [
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
    productsOnSale,
    setProductsOnSale,
  ] = useContext(ProductsContext);

  useEffect(() => {
    const currentProductsOnSale = products.filter(
      (product) => product.onSale === "yes"
    );

    setProductsOnSale(true);

    setFilteredProducts(currentProductsOnSale);
  }, [products, setFilteredProducts, setProductsOnSale]);

  return <ProductsList />;
};

export default Sale;
