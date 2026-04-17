import { Link, useLocation } from "react-router-dom";
import type { SideNavLinkType } from "./SideNavigation";
import { useSideNavToggle } from "../context/MobileSideNavContext";

type SideNavLinkProps = {
  link: SideNavLinkType;
};

export default function SideNavLink({ link }: SideNavLinkProps) {
  const urlLocation = useLocation();
  const { sideNavIsOpen, setSideNavIsOpen } = useSideNavToggle();

  return (
    <li
      className={`w-full text-sm sm:text-md hover:bg-slate-200 hover:font-semibold ${link.href === urlLocation.pathname && "bg-slate-100 border-l-4 border-sky-700 font-semibold"} no-border-transition transition-colors duration-100`}
      tabIndex={sideNavIsOpen ? 1 : 0}>
      <Link
        to={link.href}
        onClick={() => setSideNavIsOpen(false)}
        className={`flex items-center gap-4 sm:gap-3 lg:gap-5 px-8 sm:px-5 lg:px-6 xl:px-8 py-3 ${link.href === urlLocation.pathname && "-translate-x-1 text-accent-100"} transition-colors duration-100`}>
        {link.icon}
        <span>{link.name}</span>
      </Link>
    </li>
  );
}
