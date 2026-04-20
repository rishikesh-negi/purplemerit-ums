import { useEffect, useRef } from "react";
import Form, { type FormApi } from "../components/Form";
import Button from "../components/ui/Button";
import FormTextInput from "../components/ui/FormTextInput";
import { useLogin } from "../hooks/useLogin";
import { useAppSelector } from "../store/storeHooks";
import { getUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/ui/Spinner";

export type Credentials = {
  emailOrUsername: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const user = useAppSelector(getUser);
  const formApiRef = useRef<FormApi>(null);
  const { login, isLoggingIn } = useLogin();

  function handleSave<T>(data: T) {
    login(data as Credentials, {
      onSettled() {
        formApiRef.current?.clear();
      },
    });
  }

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);
  if (user) return <Spinner />;

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
