import { Outlet } from "react-router-dom";
import { useSideNavToggle } from "../../context/MobileSideNavContext";
import SideNavigation from "../SideNavigation";
import Header from "../Header";
import { useRefreshSession } from "../../hooks/useRefreshSession";
import { useAppSelector } from "../../store/storeHooks";
import { getAuthState } from "../../store/slices/authSlice";
import { useEffect } from "react";
import Spinner from "./Spinner";

export default function AppLayout() {
  const { sideNavIsOpen, setSideNavIsOpen } = useSideNavToggle();
  const { isAuthenticated, accessTokenExpiresAt } = useAppSelector(getAuthState);
  const { refreshSession, isRefreshingSession } = useRefreshSession();

  useEffect(() => {
    if (
      !isAuthenticated ||
      (accessTokenExpiresAt && accessTokenExpiresAt?.getTime() - Date.now() <= 1_80_000)
    ) {
      refreshSession();
    }
  }, [accessTokenExpiresAt, isAuthenticated, refreshSession]);

  if (isRefreshingSession) return <Spinner />;

  return (
    <div className="relative w-full h-dvh grid grid-cols-[1fr] sm:grid-cols-[25%_1fr] md:grid-cols-[20%_1fr] xl:grid-cols-[18%_1fr] 2xl:grid-cols-[15%_1fr] grid-rows-[auto_1fr] bg-backdrop text-regular-text">
      {sideNavIsOpen && (
        <div
          className="fixed inset-0 backdrop-blur-lg z-10"
          onClick={() => setSideNavIsOpen(false)}></div>
      )}
      <Header />
      <SideNavigation />

      <main className="col-span-1 sm:col-start-2 sm:col-end-3 row-start-2 row-end-3 bg-gray-100 grid overflow-y-auto styled-scrollbar">
        <div className="max-w-7xl w-full px-6 md:px-8 lg:px-12 xl:px-20 py-4 md:py-6 lg-py-8 xl:py-10 mx-auto flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
