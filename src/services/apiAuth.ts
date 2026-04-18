import type { SignupData } from "../pages/Signup";
import { API_BASE_URL } from "../utils/appConstants";

export async function signup({ firstName, lastName, username, email, password }: SignupData) {
  const exists = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (exists.ok) {
    throw new Error("An account with this email address already exists. Did you mean to log in?");
  }

  const res = await fetch(`${API_BASE_URL}/users/signup`, {
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

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Signup failed: ${error.message}`);
  }

  const authData = await res.json();
  return authData;
}

export async function logout() {
  const res = await fetch(`${API_BASE_URL}/users/logout`);
  if (!res.ok) throw new Error("Failed to log out. Try again.");
  return "success";
}
