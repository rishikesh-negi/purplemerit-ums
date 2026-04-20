import { API_BASE_URL } from "../utils/appConstants";

export async function getUsers() {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  return res;
}
