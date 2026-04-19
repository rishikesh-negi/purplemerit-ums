import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AppToast from "../components/ui/AppToast";
import { refreshSession as refreshSessionApi } from "../services/apiAuth";
import { setAuth } from "../store/slices/authSlice";
import { setUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/storeHooks";
import { FAIL_TOAST_ID } from "../utils/appConstants";

export function useRefreshSession() {
  const dispatch = useAppDispatch();

  const { mutate: refreshSession, isPending: isRefreshingSession } = useMutation({
    mutationFn: refreshSessionApi,
    onSuccess(queryData) {
      const { data } = queryData;
      dispatch(setUser({ data: data.user }));
      dispatch(
        setAuth({ accessToken: data.accessToken, accessTokenExpiresAt: data.accessTokenExpiresAt }),
      );
    },
    onError(err) {
      toast.custom((t) => <AppToast type="fail" message={err.message} toastId={t.id} />, {
        duration: 5000,
        id: FAIL_TOAST_ID,
      });
    },
  });

  return { refreshSession, isRefreshingSession };
}
