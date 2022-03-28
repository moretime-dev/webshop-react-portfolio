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
    productsPerPage,
    setProductsPerPage,
  ] = useContext(ProductsContext);

  useEffect(() => {
    const currentProductsOnSale = products.filter(
      (product) => product.onSale === "yes"
    );

    setProductsOnSale(true);

    setFilteredProducts(currentProductsOnSale);
    // setProductsPerPage(currentProductsOnSale);
  }, [products.length]);

  return <ProductsList />;
};

export default Sale;
