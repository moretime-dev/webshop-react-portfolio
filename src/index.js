import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ProductsProvider } from "./store/products-context";
import { UsersProvider } from "./store/users-context";
import { AuthProvider } from "./store/auth-context";
import { CartProvider } from "./store/cart-context";
import { ParamsProvider } from "./store/params-context";

ReactDOM.render(
  <React.StrictMode>
    <>
      <ParamsProvider>
        <ProductsProvider>
          <UsersProvider>
            <AuthProvider>
              <CartProvider>
                <App />{" "}
              </CartProvider>
            </AuthProvider>
          </UsersProvider>
        </ProductsProvider>
      </ParamsProvider>
    </>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
