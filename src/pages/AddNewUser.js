import SignUpForm from "../components/Users/SignUpForm";

import { db } from "../firebase_config";
import { collection, addDoc } from "firebase/firestore";

const usersCollection = collection(db, "users");
const AddNewUser = () => {
  const onSignUpFormSubmitHandler = async (userData) => {
    console.log(userData);

    const user = {
      userEmail: userData.userEmail,
      password: userData.userPassword,
      role: "user",
    };
    await addDoc(usersCollection, user);
  };

  return <SignUpForm onPassUserData={onSignUpFormSubmitHandler} />;
};

export default AddNewUser;
