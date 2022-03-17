import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/UI/Button";

import styles from "./styles/UserData.module.css";

const UserData = () => {
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  const onEditAddressButtonClickHandler = () => {
    navigate("/user-profile/edit-user-data");
  };

  return (
    <div>
      <section>
        <p>
          <span className={styles.userDataLabel}>Full Name:</span>{" "}
          {currentUser.currentUserFullName
            ? currentUser.currentUserFullName
            : "Please fill out address form!"}
        </p>
        <p>
          <span className={styles.userDataLabel}>Street Name:</span>{" "}
          {currentUser.currentUserStreetName
            ? currentUser.currentUserStreetName
            : "Please fill out address form!"}
        </p>
        <p>
          <span className={styles.userDataLabel}>Zip Code:</span>{" "}
          {currentUser.currentUserZipCode
            ? currentUser.currentUserZipCode
            : "Please fill out address form!"}
        </p>
        <p>
          <span className={styles.userDataLabel}>City:</span>{" "}
          {currentUser.currentUserCity
            ? currentUser.currentUserCity
            : "Please fill out address form!"}
        </p>
      </section>
      <Button
        buttonText="Edit Address"
        onClick={onEditAddressButtonClickHandler}
        className={styles.editAddressButton}
      />
    </div>
  );
};

export default UserData;
