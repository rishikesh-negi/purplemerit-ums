import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AppToast from "../components/ui/AppToast";
import { signup as signupApi } from "../services/apiAuth";
import { setAuth } from "../store/slices/authSlice";
import { setUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../store/storeHooks";
import { FAIL_TOAST_ID, SUCCESS_TOAST_ID } from "../utils/appConstants";

export function useSignup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: (queryData) => {
      const { data } = queryData;
      dispatch(
        setAuth({ accessToken: data.accessToken, accessTokenExpiresAt: data.accessTokenExpiresAt }),
      );
      dispatch(setUser({ data }));

      toast.custom((t) => <AppToast type="success" message="Signup successful!" toastId={t.id} />, {
        duration: 3000,
        id: SUCCESS_TOAST_ID,
      });

      navigate("/", { replace: true });
    },
    onError: (err) =>
      toast.custom(
        (t) => (
          <AppToast
            type="fail"
            message={err.message || "Registration failed! Something went wrong"}
            toastId={t.id}
          />
        ),
        {
          duration: 5000,
          id: FAIL_TOAST_ID,
        },
      ),
  });

  return { signup, isSigningUp };
}
