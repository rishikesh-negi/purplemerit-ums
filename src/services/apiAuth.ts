import type { Credentials } from "../pages/Login";
import type { SignupData } from "../pages/Signup";
import { API_BASE_URL } from "../utils/appConstants";
import { isEmail } from "../utils/stringValidators";

export async function signup({ firstName, lastName, username, email, password }: SignupData) {
  const res = await fetch(`${API_BASE_URL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, username, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Signup failed: ${error.message}`);
  }

  const authData = await res.json();
  return authData;
}

export async function login({ emailOrUsername, password }: Credentials) {
  if (!emailOrUsername || !password) throw new Error("Invalid credentials!");
  const credentials: Record<string, string> = { password };

  if (isEmail(emailOrUsername)) credentials.email = emailOrUsername;
  else credentials.username = emailOrUsername;

  const res = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Login failed!");

  const data = await res.json();
  return data;
}

export async function refreshSession() {
  const authStatus = await fetch(`${API_BASE_URL}/users/check-auth`, { credentials: "include" });
  if (authStatus.status === 401) return 401;

  const res = await fetch(`${API_BASE_URL}/users/refresh-session`, { credentials: "include" });
  if (!res.ok)
    throw new Error((await res.json()).message || "Failed to load session. Please log in again");

  const data = await res.json();
  return data;
}

export async function logout() {
  const res = await fetch(`${API_BASE_URL}/users/logout`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to log out. Try again.");
  return "success";
}
