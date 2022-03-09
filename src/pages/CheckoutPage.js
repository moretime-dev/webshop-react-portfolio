import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../store/cart-context";

import Button from "../components/UI/Button";

import styles from "./styles/CheckoutPage.module.css";

import { db } from "../firebase_config";
import { updateDoc, doc } from "firebase/firestore";

const CheckoutPage = () => {
  const [
    productsQuantity,
    setproductsQuantity,
    productsInCart,
    setProductsInCart,
    totalPrice,
  ] = useContext(CartContext);

  const [currentUser, setCurrentUser] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  const navigate = useNavigate();

  const onSelectPaymentMethodChangeHandler = (event) => {
    setPaymentMethod(event.target.value);
  };

  // const newOrder = {
  //   date: new Date(),
  //   products: [...productsInCart],
  //   totalAmount: totalPrice,
  //   paymentMethod: paymentMethod,
  // };

  // const currentOrderHistory = {
  //   ...currentUser.currentUserOrderHistory,
  //   newOrder,
  // };

  // const orderHistory = {
  //   orderHistory: [],
  // };

  // for (let order in currentOrderHistory) {
  //   orderHistory.orderHistory.push(currentOrderHistory[order]);
  // }

  const onBuyNowButtonClickHandler = async () => {
    const newOrder = {
      date: new Date(Date.now()).toUTCString(),
      products: [...productsInCart],
      totalAmount: totalPrice,
      paymentMethod: paymentMethod,
    };

    const currentOrderHistory = [];

    for (let thing in currentUser.currentUserOrderHistory) {
      // for (let order in currentUser.currentUserOrderHistory[thing]) {
      currentOrderHistory.push(currentUser.currentUserOrderHistory[thing]);
      // }
    }

    currentOrderHistory.push(newOrder);

    console.log(currentOrderHistory);

    const orderHistory = {
      orderHistory: [],
    };

    for (let order in currentOrderHistory) {
      orderHistory.orderHistory.push(currentOrderHistory[order]);
    }
    const userDoc = doc(db, "users", currentUser.currentUserId);

    await updateDoc(userDoc, orderHistory);

    const updatedUser = {
      currentUserEmail: currentUser.currentUserEmail,
      currentUserId: currentUser.currentUserId,
      currentUserRole: currentUser.currentUserRole,
      currentUserIsLoggedIn: currentUser.currentUserIsLoggedIn,
      currentUserFullName: currentUser.currentUserFullName,
      currentUserStreetName: currentUser.currentUserStreetName,
      currentUserZipCode: currentUser.currentUserZipCode,
      currentUserCity: currentUser.currentUserCity,
      currentUserOrderHistory: currentOrderHistory,
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    navigate("/order-confirmation");
    setProductsInCart([]);
  };

  return (
    <div>
      <div>Total Price: €{totalPrice.toFixed(2)}</div>
      <div>eMail: {currentUser.currentUserEmail}</div>

      {currentUser.currentUserFullName &&
      currentUser.currentUserFullName !== "" &&
      currentUser.currentUserStreetName &&
      currentUser.currentUserStreetName !== "" &&
      currentUser.currentUserZipCode &&
      currentUser.currentUserZipCode !== "" &&
      currentUser.currentUserCity &&
      currentUser.currentUserCity !== "" ? (
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
        <select
          name="payment-options"
          id="payment-options"
          onChange={onSelectPaymentMethodChangeHandler}
        >
          <option value="">--Please Select Payment Method--</option>
          <option value="Paypal">Paypal</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
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
