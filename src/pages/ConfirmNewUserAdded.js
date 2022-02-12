import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmNewUserAdded = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/login-user"), 3000);
  }, [navigate]);

  return (
    <h3>
      You have successfully signed up. You will be forwarded to the login page.
    </h3>
  );
};

export default ConfirmNewUserAdded;
