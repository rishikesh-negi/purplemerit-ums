import { createContext, use, type ReactNode } from "react";
import toast from "react-hot-toast";
import AppToast from "../components/ui/AppToast";
import { refreshSession } from "../services/apiAuth";
import { setAuth } from "../store/slices/authSlice";
import { setUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/storeHooks";
import { FAIL_TOAST_ID } from "../utils/appConstants";

type QueryWithReauthContextType = {
  queryWithReauth: (
    serviceFn: (...args: unknown[]) => Promise<Response>,
    args: unknown[] | undefined,
  ) => Promise<void>;
};

const QueryWithReauthContext = createContext<QueryWithReauthContextType | null>(null);

export default function QueryWithReauthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  let refreshSessionPromise: Promise<void> | null = null;

  async function refreshSessionForQuery() {
    const { user, accessToken, accessTokenExpiresAt } = await refreshSession();
    dispatch(setUser({ data: user }));
    dispatch(setAuth({ accessToken, accessTokenExpiresAt }));
  }

  async function ensureSessionRefresh() {
    if (!refreshSessionPromise) {
      refreshSessionPromise = refreshSessionForQuery().finally(
        () => (refreshSessionPromise = null),
      );
    }
    return refreshSessionPromise;
  }

  async function queryWithReauth(
    serviceFn: (...args: unknown[]) => Promise<Response>,
    args: unknown[] | undefined = undefined,
  ) {
    try {
      let res = await serviceFn(...(args ?? []));
      if (res.status === 401) {
        await ensureSessionRefresh();
        res = await serviceFn(...(args ?? []));
        if (res.status === 401) throw new Error("Session expired. Please log in again");
      }

      if (!res.ok) throw new Error((await res.json()).message || "Something went wrong!");
      const data = await res.json();
      return data;
    } catch (err) {
      toast.custom(
        (t) => <AppToast type="fail" message={`${(err as Error).message}`} toastId={t.id} />,
        { duration: 5000, id: FAIL_TOAST_ID },
      );
      throw err;
    }
  }

  return (
    <QueryWithReauthContext.Provider value={{ queryWithReauth }}>
      {children}
    </QueryWithReauthContext.Provider>
  );
}

export function useQueryWithReauth() {
  const context = use(QueryWithReauthContext);
  if (!context) throw new Error("Context was used outside its provider");
  return context;
}
