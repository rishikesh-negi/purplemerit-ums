import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../services/apiAuth";
import { useAppDispatch } from "../store/storeHooks";
import { clearUser } from "../store/slices/userSlice";
import { resetAuth } from "../store/slices/authSlice";
import toast from "react-hot-toast";
import AppToast from "../components/ui/AppToast";
import { FAIL_TOAST_ID, SUCCESS_TOAST_ID } from "../utils/appConstants";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    mutate: logout,
    isPending: isLoggingOut,
    error,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess(status) {
      if (status === "success") {
        dispatch(clearUser());
        dispatch(resetAuth());
        navigate("/");
        toast.custom(
          (t) => <AppToast type="success" message="Logged out successfully" toastId={t.id} />,
          { duration: 3000, id: SUCCESS_TOAST_ID },
        );
      }
    },
    onError(err) {
      toast.custom(
        (t) => <AppToast type="fail" message="Failed to logout. Try again" toastId={t.id} />,
        { duration: 3000, id: FAIL_TOAST_ID },
      );
      console.error(err);
    },
  });

  return { logout, isLoggingOut, error };
}
