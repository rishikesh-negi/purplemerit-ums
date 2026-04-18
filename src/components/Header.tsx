import { MdAccountCircle } from "react-icons/md";
import { getUser } from "../store/slices/userSlice";
import { useAppSelector } from "../store/storeHooks";
import Button from "./ui/Button";
import { useLocation } from "react-router-dom";

export default function Header() {
  const user = useAppSelector(getUser);
  const pathname = useLocation();

  return (
    <header className="row-start-1 row-span-1 col-start-1 sm:col-start-2 col-span-1 px-12 py-3 flex items-center justify-between bg-gray-100 border-b border-gray-200">
      {user ? (
        <Button
          to="/profile"
          textOnly={true}
          className="button-link flex items-center gap-1 ml-auto">
          <span>
            <MdAccountCircle className="w-6 lg:w-8 h-6 lg:h-8 text-gray-400" />
          </span>
          Profile
        </Button>
      ) : (
        <div className="flex items-center gap-5 ml-auto">
          {pathname.pathname !== "/login" && (
            <Button to="/login" textOnly={true} className="button-link">
              Login
            </Button>
          )}
          {pathname.pathname !== "/signup" && (
            <Button to="/signup" textOnly={true} className="button-link">
              Signup
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
