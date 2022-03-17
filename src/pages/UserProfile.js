import { useNavigate } from "react-router-dom";

import UserData from "./UserData";
import Button from "../components/UI/Button";

import styles from "./styles/UserProfile.module.css";

const UserProfile = () => {
  const navigate = useNavigate();

  const onOrderHistoryButtonClickHandler = () => {
    navigate("/user-profile/order-history");
  };

  return (
    <div className={styles.userDataContainer}>
      <UserData />
      <Button
        buttonText="OrderHistory"
        onClick={onOrderHistoryButtonClickHandler}
        className={styles.userProfileButton}
      />
    </div>
  );
};

export default UserProfile;
