import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/storeHooks";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../services/apiAuth";
import { setUser } from "../store/slices/userSlice";
import { setAuth } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import AppToast from "../components/ui/AppToast";
import { FAIL_TOAST_ID, SUCCESS_TOAST_ID } from "../utils/appConstants";

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: loginApi,
    onSuccess(queryData) {
      const { data } = queryData;
      dispatch(setUser({ data: data.user }));
      dispatch(
        setAuth({ accessToken: data.accessToken, accessTokenExpiresAt: data.accessTokenExpiresAt }),
      );
      toast.custom((t) => <AppToast type="success" message="Logged in!" toastId={t.id} />, {
        duration: 3000,
        id: SUCCESS_TOAST_ID,
      });
      navigate("/");
    },
    onError(err) {
      toast.custom(
        (t) => <AppToast type="fail" message={err.message || "Login failed!"} toastId={t.id} />,
        { duration: 5000, id: FAIL_TOAST_ID },
      );
    },
  });

  return { login, isLoggingIn };
}
