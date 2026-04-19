import { LuLoaderCircle } from "react-icons/lu";

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 backdrop:backdrop-blur-xs">
      <LuLoaderCircle className="text-3xl text-faint-text spinner" />
    </div>
  );
}
