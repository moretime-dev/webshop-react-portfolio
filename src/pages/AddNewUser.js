import SignUpForm from "../components/Users/SignUpForm";

const AddNewUser = () => {
  const onSignUpFormSubmitHandler = (userData) => {
    console.log(userData);
  };

  return <SignUpForm onPassUserData={onSignUpFormSubmitHandler} />;
};

export default AddNewUser;
