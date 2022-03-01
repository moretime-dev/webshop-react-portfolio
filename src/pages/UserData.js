import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../store/auth-context";

import Button from "../components/UI/Button";

import { db } from "../firebase_config";
import { collection, updateDoc, doc } from "firebase/firestore";

import styles from "../components/Products/styles/ProductForm.module.css";

const UserData = () => {
  const usersCollection = collection(db, "users");

  const [currentUserRole, currentUserIsLoggedIn, currentUserFromLocalStorage] =
    useContext(AuthContext);

  const [fullName, setFullName] = useState("");
  const [streetName, setStreetName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");

  const [fullNameIsValid, setFullNameIsValid] = useState(false);
  const [streetNameIsValid, setStreetNameIsValid] = useState(false);
  const [zipCodeIsValid, setZipCodeIsValid] = useState(false);
  const [cityIsValid, setCityIsValid] = useState(false);

  const [addressFormIsValid, setAddressFormIsValid] = useState(false);
  const [userAddressData, setUserAddressData] = useState({});

  console.log(currentUserFromLocalStorage);

  const onFullNameChangeHandler = (event) => {
    setFullName(event.target.value.trim());
  };
  const onStreetNameChangeHandler = (event) => {
    setStreetName(event.target.value.trim());
  };
  const onZipCodeChangeHandler = (event) => {
    setZipCode(event.target.value.trim());
  };
  const onCityChangeHandler = (event) => {
    setCity(event.target.value.trim());
  };

  useEffect(() => {
    if (fullName !== "") {
      setFullNameIsValid(true);
    } else {
      setFullNameIsValid(false);
    }

    if (streetName !== "") {
      setStreetNameIsValid(true);
    } else {
      setStreetNameIsValid(false);
    }

    if (!isNaN(parseInt(zipCode)) && zipCode !== "") {
      setZipCodeIsValid(true);
    } else {
      setZipCodeIsValid(false);
    }

    if (city !== "") {
      setCityIsValid(true);
    } else {
      setCityIsValid(false);
    }

    if (fullNameIsValid && streetNameIsValid && zipCodeIsValid && cityIsValid) {
      setAddressFormIsValid(true);
      setUserAddressData({
        fullName,
        streetName,
        zipCode,
        city,
      });
    } else {
      setAddressFormIsValid(false);
    }
  }, [
    fullName,
    streetName,
    zipCode,
    city,
    fullNameIsValid,
    streetNameIsValid,
    zipCodeIsValid,
    cityIsValid,
  ]);

  const onAddressFormSubmitHandler = async (event) => {
    event.preventDefault();

    const userDoc = doc(db, "users", currentUserFromLocalStorage.currentUserId);

    await updateDoc(userDoc, userAddressData);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onAddressFormSubmitHandler}>
        <div className={styles.formField}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            name="fullName"
            type="text"
            onChange={onFullNameChangeHandler}
            className={`${fullNameIsValid && styles.validFormField}`}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="street">Street:</label>
          <input
            name="street"
            type="text"
            onChange={onStreetNameChangeHandler}
            className={`${streetNameIsValid && styles.validFormField}`}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="zipCode">Zip Code:</label>
          <input
            name="zipCode"
            type="text"
            onChange={onZipCodeChangeHandler}
            className={`${zipCodeIsValid && styles.validFormField}`}
          />
        </div>
        <div className={styles.formField}>
          <label htmlFor="city">City:</label>
          <input
            name="city"
            type="text"
            onChange={onCityChangeHandler}
            className={`${cityIsValid && styles.validFormField}`}
          />
        </div>
        <Button
          buttonText={!addressFormIsValid ? "Complete Form" : "Save Changes"}
          className={`${styles.button} ${
            addressFormIsValid && styles.buttonEnabled
          }`}
          disabled={!addressFormIsValid}
        />
      </form>
    </div>
  );
};

export default UserData;
