import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./styles/UserForm.module.css";

const LoginForm = () => {
  return (
    <Card className={styles.userFormCard}>
      <h1 className={styles.userHeadline}>Login</h1>
      <form className={styles.userFormContainer}>
        <div className={styles.userField}>
          <label htmlFor="email">Email:</label>
          <input type="email" className={styles.userInput} />
        </div>
        <div className={styles.userField}>
          <label htmlFor="password">Password:</label>
          <input type="password" className={styles.userInput} />
        </div>

        <Button buttonText="LOGIN" className={styles.userButton} />
      </form>
    </Card>
  );
};

export default LoginForm;
