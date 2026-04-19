import { useRef } from "react";
import Form, { type FormApi } from "../components/Form";
import Button from "../components/ui/Button";
import FormTextInput from "../components/ui/FormTextInput";
import { useSignup } from "../hooks/useSignup";

export type SignupData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export default function Signup() {
  const formApiRef = useRef<FormApi>(null);
  const { signup, isSigningUp } = useSignup();

  function handleSave<T>(data: T) {
    signup(data as SignupData, {
      onSettled() {
        formApiRef.current?.clear();
      },
    });
  }

  return (
    <section className="w-full h-full flex flex-col items-center gap-10">
      <Button to="/" textOnly className="button-link block w-full">
        &larr; Home
      </Button>
      <Form
        ref={formApiRef}
        heading="Sign up to UMS!"
        className="form-base lg:min-w-[60%]"
        onSave={handleSave}>
        <FormTextInput
          label="First name"
          type="text"
          id="firstName"
          name="firstName"
          className="form-text-input"
          required={true}
        />
        <FormTextInput
          label="Last name"
          type="text"
          id="lastName"
          name="lastName"
          className="form-text-input"
          required={true}
        />
        <FormTextInput
          label="Username"
          type="text"
          id="username"
          name="username"
          className="form-text-input"
          required={true}
        />
        <FormTextInput
          label="Email"
          type="email"
          id="email"
          name="email"
          className="form-text-input"
          required={true}
        />
        <FormTextInput
          label="Password"
          type="password"
          id="password"
          name="password"
          className="form-text-input"
          required={true}
        />
        <Button className="button-primary ml-auto" disabled={isSigningUp}>
          Sign up
        </Button>
      </Form>
    </section>
  );
}
