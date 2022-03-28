import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
import { useState } from "react";
import FormInput from "../components/form-input/form-input.component";
import "./sign-up-form.scss";
import Button from "../components/button/button.component";

const defaultFormFields = {
  DisplayName: "",
  Email: "",
  Password: "",
  ConfirmPassword: "",
};

const SignUpForm = () => {
  const [FormFields, setFormFields] = useState(defaultFormFields);
  const { DisplayName, Email, Password, ConfirmPassword } = FormFields;

  console.log(FormFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      alert("Password do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        Email,
        Password
      );

      await createUserDocumentFromAuth(user, { DisplayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.log("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };
  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...FormFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an acoount?</h2>
      <span>Sign Up With Your Email And Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={onHandleChange}
          name="DisplayName"
          value={DisplayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={onHandleChange}
          name="ConfirmPassword"
          value={ConfirmPassword}
        />
        <Button buttonType="inverted" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};
export default SignUpForm;
