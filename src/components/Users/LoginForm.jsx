import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./styles/LoginForm.module.css";

const LoginForm = () => {
  return (
    <Card className={styles.loginFormCard}>
      <h1 className={styles.loginHeadline}>Login</h1>
      <form className={styles.loginFormContainer}>
        <div className={styles.loginField}>
          <label htmlFor="email">Email:</label>
          <input type="email" className={styles.loginInput} />
        </div>
        <div className={styles.loginField}>
          <label htmlFor="password">Password:</label>
          <input type="password" className={styles.loginInput} />
        </div>

        <Button buttonText="LOGIN" className={styles.loginButton} />
      </form>
    </Card>
  );
};

export default LoginForm;
