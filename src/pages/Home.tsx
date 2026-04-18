import { getUser } from "../store/slices/userSlice";
import { useAppSelector } from "../store/storeHooks";

export default function Home() {
  const user = useAppSelector(getUser);
  console.log(user);

  return (
    <div className="w-full h-full flex flex-col gap-6 items-center mt-24">
      <h1 className="heading-primary">Welcome to UMS</h1>
      <div className="text-center">
        <p className="text-lg">
          UMS (User Management System) allows administrators and managers to efficiently manage
          users across the platform.
        </p>
        {!user && (
          <p className="text-lg">Log in or sign up to start managing users or your profile</p>
        )}
      </div>
    </div>
  );
}
