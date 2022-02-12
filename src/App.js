import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/UI/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import ConfirmNewProductUpload from "./pages/ConfirmNewProductUpload";
import NotFound from "./pages/NotFound";
import ProductDetails from "./components/Products/ProductDetails";
import Sale from "./pages/Sale";
import AddNewUser from "./pages/AddNewUser";
import LoginUser from "./pages/LoginUser";
import "./App.css";

import { ProductsProvider } from "./store/products-context";

function App() {
  return (
    <ProductsProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/products" exact element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/add-product" exact element={<AddProduct />} />
            <Route
              path="/add-product-confirm"
              exact
              element={<ConfirmNewProductUpload />}
            />
            <Route path="add-new-user" element={<AddNewUser />} />
            <Route path="login-user" element={<LoginUser />} />
            <Route path="*" exact element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ProductsProvider>
  );
}

export default App;
