import { setAuth } from "../store/slices/authSlice";
import { setUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/storeHooks";
import { apiBaseUrl } from "../utils/appConstants";

type SignupData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export async function signup({ firstName, lastName, username, email, password }: SignupData) {
  const res = await fetch(`${apiBaseUrl}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
  });

  if (!res.ok) throw new Error("Signup failed!");

  const { accessToken, user, accessTokenExpiresAt } = await res.json();
  const dispatch = useAppDispatch();
  dispatch(setAuth({ accessToken, accessTokenExpiresAt }));
  dispatch(setUser({ data: user }));

  return { accessToken, user, accessTokenExpiresAt };
}
