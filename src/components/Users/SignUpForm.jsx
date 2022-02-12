import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./styles/UserForm.module.css";

const MINIMUM_PASSWORD_LENGTH = 5;

const SignUpForm = ({ onPassUserData }) => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");

  const [userEmailIsValid, setUserEmailIsValid] = useState(false);
  const [userPasswordIsValid, setUserPasswordIsValid] = useState(false);

  const [userData, setUserData] = useState({});

  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  const onUserEmailInputHandler = (event) => {
    setUserEmail(event.target.value);
  };

  const onUserPasswordInputHandler = (event) => {
    setUserPassword(event.target.value);
  };

  const onUserPasswordConfirmInputHandler = (event) => {
    setConfirmUserPassword(event.target.value);
  };

  useEffect(() => {
    if (userEmail.includes("@")) {
      setUserEmailIsValid(true);
    } else {
      setUserEmailIsValid(false);
    }

    if (
      userPassword === confirmUserPassword &&
      userPassword !== "" &&
      confirmUserPassword !== "" &&
      userPassword.length >= MINIMUM_PASSWORD_LENGTH &&
      confirmUserPassword.length >= MINIMUM_PASSWORD_LENGTH
    ) {
      setUserPasswordIsValid(true);
    } else {
      setUserPasswordIsValid(false);
    }

    if (userEmailIsValid && userPasswordIsValid) {
      setUserData({
        userEmail: userEmail,
        userPassword: userPassword,
      });

      setButtonIsDisabled(false);
    } else {
      setButtonIsDisabled(true);
    }
  }, [
    userEmail,
    userPassword,
    confirmUserPassword,
    userEmailIsValid,
    userPasswordIsValid,
  ]);

  const onSignUpFormSubmit = (event) => {
    event.preventDefault();

    onPassUserData(userData);

    navigate("/sign-up-success");
  };

  return (
    <Card className={styles.userFormCard}>
      <h1 className={styles.userHeadline}>Sign Up For Free</h1>
      <form onSubmit={onSignUpFormSubmit} className={styles.userFormContainer}>
        <div className={styles.userField}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className={styles.userInput}
            onChange={onUserEmailInputHandler}
          />
        </div>
        <div className={styles.userField}>
          <label htmlFor="password">Password (min 5 characters):</label>
          <input
            type="password"
            className={styles.userInput}
            onChange={onUserPasswordInputHandler}
          />
        </div>
        <div className={styles.userField}>
          <label htmlFor="password">Confirm Password:</label>
          <input
            type="password"
            className={styles.userInput}
            onChange={onUserPasswordConfirmInputHandler}
          />
        </div>

        <Button
          buttonText="SIGN UP"
          className={styles.userButton}
          disabled={buttonIsDisabled}
        />
      </form>
    </Card>
  );
};

export default SignUpForm;
