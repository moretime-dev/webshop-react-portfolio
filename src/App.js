import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/UI/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import NotFound from "./pages/NotFound";
import ProductDetails from "./components/Products/ProductDetails";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/products" exact element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/add-product" exact element={<AddProduct />} />
          <Route path="*" exact element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
