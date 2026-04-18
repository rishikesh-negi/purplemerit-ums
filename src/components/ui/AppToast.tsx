import toast from "react-hot-toast";
import { MdCancel, MdCheckCircle } from "react-icons/md";

type AppToastProps = {
  type: "success" | "fail";
  message: string;
  toastId: string;
};

export default function AppToast({ type, message, toastId }: AppToastProps) {
  const icon =
    type === "success" ? (
      <MdCheckCircle size={20} className="text-green-200" />
    ) : (
      <MdCancel size={20} className="text-red-200" />
    );

  return (
    <div
      className={`px-2 lg:px-3 py-0.5 lg:py-1 rounded-sm flex items-center gap-2 lg:gap-3 w-fit max-w-xl text-xs md:text-sm xl:text-lg font-semibold xl:font-bold text-gray-50 shadow-md ${type === "success" ? "bg-green-700" : "bg-red-700"}`}>
      <span>{icon}</span>
      <p>{message}</p>
      <button
        className="ml-auto pl-3 lg:pl-4 content-end text-gray-50 text-sm lg:text-lg xl:text-xl font-bold cursor-pointer"
        onClick={() => toast.dismiss(toastId)}>
        &times;
      </button>
    </div>
  );
}
