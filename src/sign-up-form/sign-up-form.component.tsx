import { useState, FormEvent, ChangeEvent } from "react";

import { AuthErrorCodes, AuthError } from "firebase/auth";
import { useDispatch } from "react-redux";
import FormInput from "../components/form-input/form-input.component";
import "./sign-up-form.scss";
import Button from "../components/button/button.component";
import { signUpStart } from "../store/user/user.action";

const defaultFormFields = {
  DisplayName: "",
  Email: "",
  Password: "",
  ConfirmPassword: "",
  DeliveryAddress: "",
};

const SignUpForm = () => {
  const [FormFields, setFormFields] = useState(defaultFormFields);
  const { DisplayName, DeliveryAddress, Email, Password, ConfirmPassword } =
    FormFields;
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      alert("Password do not match");
      return;
    }

    try {
      dispatch(signUpStart(Email, Password, DisplayName));
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        console.log("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };
  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
          label="Delivery Address"
          type="text"
          required
          onChange={onHandleChange}
          name="DeliveryAddress"
          value={DeliveryAddress}
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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
