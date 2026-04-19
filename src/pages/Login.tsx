import { useRef } from "react";
import Form, { type FormApi } from "../components/Form";
import Button from "../components/ui/Button";
import FormTextInput from "../components/ui/FormTextInput";
import { useLogin } from "../hooks/useLogin";

export type Credentials = {
  emailOrUsername: string;
  password: string;
};

export default function Login() {
  const formApiRef = useRef<FormApi>(null);
  const { login, isLoggingIn } = useLogin();

  function handleSave<T>(data: T) {
    login(data as Credentials, {
      onSettled() {
        formApiRef.current?.clear();
      },
    });
  }

  return (
    <section className="w-full h-full flex flex-col gap-10 items-center">
      <Button to="/" textOnly className="button-link block w-full">
        &larr; Home
      </Button>
      <Form
        ref={formApiRef}
        heading="Log in to your UMS account"
        onSave={handleSave}
        className="form-base">
        <FormTextInput
          type="text"
          label="Email/username"
          id="emailOrUsername"
          name="emailOrUsername"
          className="form-text-input"
        />
        <FormTextInput
          type="password"
          label="Password"
          id="password"
          name="password"
          className="form-text-input"
        />
        <Button className="button-primary w-full mt-2" disabled={isLoggingIn}>
          Log in
        </Button>
      </Form>
    </section>
  );
}
