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

  const [buyNowButtonDisabled, setBuyNowButtonDisabled] = useState(true);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  const navigate = useNavigate();

  const onSelectPaymentMethodChangeHandler = (event) => {
    setPaymentMethod(event.target.value);
    if (event.target.value !== "") {
      setBuyNowButtonDisabled(false);
    } else {
      setBuyNowButtonDisabled(true);
    }
  };

  const onBuyNowButtonClickHandler = async () => {
    const newOrder = {
      date: new Date(Date.now()).toUTCString(),
      products: [...productsInCart],
      totalAmount: totalPrice,
      paymentMethod: paymentMethod,
    };

    const currentOrderHistory = [];

    for (let thing in currentUser.currentUserOrderHistory) {
      currentOrderHistory.push(currentUser.currentUserOrderHistory[thing]);
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
    <div className={styles.checkoutDataContainer}>
      <div>
        <span className={styles.checkoutDataLabel}>Total Price:</span> €
        {totalPrice.toFixed(2)}
      </div>
      <div>
        <span className={styles.checkoutDataLabel}>eMail:</span>{" "}
        <span className={styles.checkoutEmail}>
          {currentUser.currentUserEmail}
        </span>
      </div>

      {currentUser.currentUserFullName &&
      currentUser.currentUserFullName !== "" &&
      currentUser.currentUserStreetName &&
      currentUser.currentUserStreetName !== "" &&
      currentUser.currentUserZipCode &&
      currentUser.currentUserZipCode !== "" &&
      currentUser.currentUserCity &&
      currentUser.currentUserCity !== "" ? (
        <div>
          <h4>Shipping Address:</h4>
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
          className={styles.paymentMethodOptions}
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
        className={`${
          !buyNowButtonDisabled
            ? styles.checkoutPageButton
            : styles.checkoutPageButtonDisabled
        } `}
        disabled={buyNowButtonDisabled}
      />
    </div>
  );
};

export default CheckoutPage;
