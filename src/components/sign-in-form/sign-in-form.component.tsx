import { useState, FormEvent, ChangeEvent } from "react";
import FormInput from "../form-input/form-input.component";
 
import "./sign-in-form.style";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.style";

const defaultFormFields = {
  Email: "",
  Password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [FormFields, setFormFields] = useState(defaultFormFields);
  const { Email, Password } = FormFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const SignInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(Email, Password));

      resetFormFields();
    } catch (error) {
      console.log("user sign in falied", error);
    }
  };

  const HandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...FormFields, [name]: value });
  };
  return (
    <SignInContainer>
      <h2>Already have an acoount.</h2>
      <span>Sign In With Email or Google Account</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={HandleChange}
          name="Email"
          value={Email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={HandleChange}
          name="Password"
          value={Password}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={SignInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};
export default SignInForm;
