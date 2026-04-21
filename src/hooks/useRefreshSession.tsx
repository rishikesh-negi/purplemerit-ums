import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AppToast from "../components/ui/AppToast";
import { refreshSession as refreshSessionApi } from "../services/apiAuth";
import { resetAuth, setAuth } from "../store/slices/authSlice";
import { clearUser, setUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/storeHooks";
import { FAIL_TOAST_ID } from "../utils/appConstants";

export function useRefreshSession() {
  const dispatch = useAppDispatch();

  const { mutate: refreshSession, isPending: isRefreshingSession } = useMutation({
    mutationFn: refreshSessionApi,
    onSuccess(queryData) {
      if (queryData === 401) return;
      const { user, accessToken, accessTokenExpiresAt } = queryData;
      dispatch(setUser({ data: user }));
      dispatch(setAuth({ accessToken, accessTokenExpiresAt }));
    },
    onError(err) {
      dispatch(clearUser());
      dispatch(resetAuth());
      toast.custom((t) => <AppToast type="fail" message={err.message} toastId={t.id} />, {
        duration: 5000,
        id: FAIL_TOAST_ID,
      });
      console.error(err);
    },
  });

  return { refreshSession, isRefreshingSession };
}
