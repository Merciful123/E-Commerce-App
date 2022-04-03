import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.style.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const defaultFormFields = {
  Email: "",
  Password: "",
};

const SignInForm = () => {
  const [FormFields, setFormFields] = useState(defaultFormFields);
  const { Email, Password } = FormFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const SignInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(Email, Password);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user is associated with this email ");
          break;
        default:
          console.log(error);
      }
    }
  };

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...FormFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Already have an acoount?</h2>
      <span>Sign In With Email, Password Or With Google Account</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={onHandleChange}
          name="Email"
          value={Email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={onHandleChange}
          name="Password"
          value={Password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={SignInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
