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
import ConfirmNewUserAdded from "./pages/ConfirmNewUserAdded";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import EditUserData from "./pages/EditUserData";
import UserProfile from "./pages/UserProfile";
import OrderHistory from "./pages/OrderHistory";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import EditProductPage from "./pages/EditProductPage";

import RequireAuth from "./utils/RequireAuth";

import "./App.css";

import { ProductsProvider } from "./store/products-context";
import { UsersProvider } from "./store/users-context";
import { AuthProvider } from "./store/auth-context";
import { CartProvider } from "./store/cart-context";

function App() {
  return (
    <ProductsProvider>
      <UsersProvider>
        <AuthProvider>
          <CartProvider>
            <div className="App">
              <BrowserRouter>
                <Header />
                <Routes>
                  <Route path="/" exact element={<Home />} />
                  <Route path="/products" exact element={<Products />} />
                  <Route
                    path="/products/:id"
                    exact
                    element={<ProductDetails />}
                  />
                  <Route
                    path="/products/category/:category"
                    exact
                    element={<Products />}
                  />
                  <Route
                    path="/products/category/:category/:filter"
                    exact
                    element={<Products />}
                  />
                  <Route path="/sale" element={<Sale />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route
                    path="/order-confirmation"
                    element={<OrderConfirmationPage />}
                  />
                  [// Only Admin allowed]
                  <Route element={<RequireAuth allowedRoles={"admin"} />}>
                    <Route path="/add-product" exact element={<AddProduct />} />
                    <Route
                      path="/products/edit-product/:id"
                      exact
                      element={<EditProductPage />}
                    />
                    <Route
                      path="/add-product-confirm"
                      exact
                      element={<ConfirmNewProductUpload />}
                    />
                  </Route>
                  <Route path="add-new-user" element={<AddNewUser />} />
                  <Route
                    path="sign-up-success"
                    element={<ConfirmNewUserAdded />}
                  />
                  <Route path="/user-profile" element={<UserProfile />} />
                  <Route
                    path="/user-profile/edit-user-data"
                    element={<EditUserData />}
                  />
                  <Route
                    path="/user-profile/order-history"
                    element={<OrderHistory />}
                  />
                  <Route path="login-user" element={<LoginUser />} />
                  <Route path="*" exact element={<NotFound />} />
                  <Route path="/not-found" exact element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </div>
          </CartProvider>
        </AuthProvider>
      </UsersProvider>
    </ProductsProvider>
  );
}

export default App;
