import type { ReactElement } from "react";
import {
  HiOutlineArrowLeftCircle,
  HiOutlineArrowsRightLeft,
  HiOutlineBars3BottomRight,
  HiOutlineHome,
  HiOutlinePresentationChartBar,
  HiOutlineArrowRightEndOnRectangle,
} from "react-icons/hi2";
import { useSideNavToggle } from "../context/MobileSideNavContext";
import SideNavLink from "./SideNavLink";
import Logo from "./ui/Logo";

export type SideNavLinkType = {
  name: string;
  href: string;
  icon: ReactElement;
};

const sideNavLinks: SideNavLinkType[] = [
  {
    name: "Home",
    href: "/dashboard",
    icon: <HiOutlineHome className="text-xl text-sky-700" />,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: <HiOutlineArrowsRightLeft className="text-xl text-sky-700" />,
  },
  {
    name: "Insights",
    href: "/insights",
    icon: <HiOutlinePresentationChartBar className="text-xl text-sky-700" />,
  },
];

export default function SideNavigation() {
  const { sideNavIsOpen, setSideNavIsOpen } = useSideNavToggle();

  const handleToggleSideNav = () => setSideNavIsOpen((curr) => !curr);

  return (
    <aside
      className={`absolute sm:static inset-0 sm:inset-auto w-[70%] sm:w-full z-20 col-span-1 row-span-full flex flex-col bg-slate-100 transition-all text-regular-text border-r border-slate-200 ${sideNavIsOpen ? "translate-0" : "-translate-x-full"} sm:translate-0`}>
      <div className="relative py-4 mb-4">
        <Logo />
        <button
          className={
            "absolute p-2 pl-1 right-0 top-1/2 translate-x-full flex items-center justify-center bg-slate-100 rounded-br-full rounded-tr-full border border-slate-200 sm:hidden cursor-pointer shadow-sm"
          }
          onClick={handleToggleSideNav}>
          {sideNavIsOpen ? (
            <HiOutlineArrowLeftCircle className="text-xl text-regular-text" />
          ) : (
            <HiOutlineBars3BottomRight className="text-xl text-regular-text" />
          )}
        </button>
      </div>

      <ul>
        {sideNavLinks.map((link) => (
          <SideNavLink link={link} key={`${link.name}${link.href}`} />
        ))}
      </ul>

      <button className="w-full px-8 sm:px-5 lg:px-6 xl:px-8 py-4 text-sm sm:text-md flex items-center gap-4 sm:gap-3 lg:gap-5 mt-auto border-t border-slate-200 hover:bg-slate-50 hover:text-sky-700 hover:font-semibold cursor-pointer">
        <HiOutlineArrowRightEndOnRectangle className="text-xl" />
        <span>Logout</span>
      </button>
    </aside>
  );
}
