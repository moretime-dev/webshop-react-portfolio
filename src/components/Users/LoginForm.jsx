import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../store/users-context";
// import { AuthContext } from "../../store/auth-context";

import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./styles/UserForm.module.css";

const LoginForm = () => {
  const [users] = useContext(UsersContext);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const onUserEmailChangeHandler = (event) => {
    setUserEmail(event.target.value);
  };

  const onUserPasswordChangeHandler = (event) => {
    setUserPassword(event.target.value);
  };

  const onUserLoginHandler = (event) => {
    event.preventDefault();

    users.forEach((user) => {
      if (userEmail === user.userEmail && userPassword === user.password) {
        console.log(user);
        setCurrentUser({
          currentUserEmail: userEmail,
          currentUserId: user.id,
          currentUserRole: user.role,
          currentUserIsLoggedIn: true,
          currentUserFullName: user.fullName ? user.fullName : "",
          currentUserStreetName: user.streetName ? user.streetName : "",
          currentUserZipCode: user.zipCode ? user.zipCode : "",
          currentUserCity: user.city ? user.city : "",
          currentUserOrderHistory: user.orderHistory ? user.orderHistory : "",
        });
      }
    });

    setTimeout(() => navigate("/"), 200);
    setTimeout(() => window.location.reload(), 500);
  };

  useEffect(() => {
    let currentUserFromLocalStorage = JSON.parse(
      localStorage.getItem("currentUser")
    );

    if (
      currentUserFromLocalStorage === null ||
      currentUserFromLocalStorage.length === 0
    ) {
      currentUserFromLocalStorage = [];
    }

    if (currentUser.currentUserIsLoggedIn) {
      const currentUserForLocalStorage = JSON.stringify(currentUser);
      localStorage.setItem("currentUser", currentUserForLocalStorage);
    }
  }, [currentUser]);

  return (
    <Card className={styles.userFormCard}>
      <h1 className={styles.userHeadline}>Login</h1>
      <form className={styles.userFormContainer}>
        <div className={styles.userField}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className={styles.userInput}
            onChange={onUserEmailChangeHandler}
          />
        </div>
        <div className={styles.userField}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className={styles.userInput}
            onChange={onUserPasswordChangeHandler}
          />
        </div>

        <Button
          buttonText="LOGIN"
          className={styles.userButton}
          onClick={onUserLoginHandler}
        />
      </form>
    </Card>
  );
};

export default LoginForm;
