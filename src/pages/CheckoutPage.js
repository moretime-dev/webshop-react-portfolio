import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../store/cart-context";

import Button from "../components/UI/Button";

import styles from "./styles/CheckoutPage.module.css";

const CheckoutPage = () => {
  const [
    productsQuantity,
    setproductsQuantity,
    productsInCart,
    setProductsInCart,
    totalPrice,
  ] = useContext(CartContext);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  const navigate = useNavigate();

  const onBuyNowButtonClickHandler = () => {
    navigate("/order-confirmation");
    setProductsInCart([]);
  };

  return (
    <div>
      <div>Total Price: €{totalPrice.toFixed(2)}</div>
      <div>eMail: {currentUser.currentUserEmail}</div>

      {currentUser.currentUserFullName &&
      currentUser.currentUserStreetName &&
      currentUser.currentUserZipCode &&
      currentUser.currentUserCity ? (
        <div>
          Address:
          <p>{currentUser.currentUserFullName}</p>
          <p>{currentUser.currentUserStreetName}</p>
          <p>
            {currentUser.currentUserZipCode} {currentUser.currentUserCity}
          </p>
        </div>
      ) : (
        'Please add a shipping address under "My Profile"'
      )}
      <div>
        <select name="payment-options" id="payment-options">
          <option value="">--Please Select Payment Method--</option>
          <option value="paypal">Paypal</option>
          <option value="credit-card">Credit Card</option>
          <option value="bank-transfer">Bank Transfer</option>
        </select>
      </div>
      <Button
        buttonText="Buy Now"
        onClick={onBuyNowButtonClickHandler}
        className={styles.checkoutPageButton}
      />
    </div>
  );
};

export default CheckoutPage;
