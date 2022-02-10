import styles from "./styles/Button.module.css";

const Button = ({ children, buttonText, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className}`}
      disabled={disabled || false}
    >
      <span className={styles.buttonText}>{buttonText}</span>
      {children}
    </button>
  );
};

export default Button;
