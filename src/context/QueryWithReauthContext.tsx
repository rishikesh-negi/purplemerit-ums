import { createContext, type ReactNode } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AppToast from "../components/ui/AppToast";
import { setAuth } from "../store/slices/authSlice";
import { setUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/storeHooks";
import { API_BASE_URL, FAIL_TOAST_ID } from "../utils/appConstants";

type QueryWithReauthContextType = {
  queryWithReauth: (
    serviceFn: (...args: unknown[]) => Promise<Response>,
    args: unknown[] | undefined,
  ) => Promise<void>;
};

const QueryWithReauthContext = createContext<QueryWithReauthContextType | null>(null);

export default function QueryWithReauthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function queryWithReauth(
    serviceFn: (...args: unknown[]) => Promise<Response>,
    args: unknown[] | undefined,
  ) {
    try {
      const res = await serviceFn(...(args?.length ? args : []));

      if (res.status === 401) {
        const authRes = await fetch(`${API_BASE_URL}/users/refresh-session`, {
          credentials: "include",
        });

        if (!authRes.ok) {
          navigate("/");
          throw new Error("Session expired. Please log in again");
        }

        if (authRes.ok) {
          const { user, accessToken, accessTokenExpiresAt } = await authRes.json();
          dispatch(setAuth({ accessToken, accessTokenExpiresAt }));
          dispatch(setUser({ data: user }));
          const retryRes = await serviceFn(...(args?.length ? args : []));
          const data = await retryRes.json();
          if (!retryRes.ok) throw new Error(`${data.message}` || "Something went wrong");
          return data;
        }
      }
      const data = await res.json();
      if (!res.ok) throw new Error(`${data.message}` || "Something went wrong!");
      return data;
    } catch (err) {
      toast.custom(
        (t) => <AppToast type="fail" message={`${(err as Error).message}`} toastId={t.id} />,
        { duration: 5000, id: FAIL_TOAST_ID },
      );
    }
  }

  return (
    <QueryWithReauthContext.Provider value={{ queryWithReauth }}>
      {children}
    </QueryWithReauthContext.Provider>
  );
}

export function useQueryWithReauth() {
  // const context =
}
