import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="block w-fit mx-auto px-3 py-1 border-2 border-dark-text text-dark-text text-2xl font-bold tracking-widest shadow-md text-center">
      UMS
    </Link>
  );
}
