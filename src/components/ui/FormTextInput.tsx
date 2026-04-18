import type { ComponentPropsWithoutRef } from "react";

type FormTextInputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  type: "text" | "password" | "number" | "email";
  name: string;
  id: string;
};

export default function FormTextInput({
  label,
  type = "text",
  name,
  id,
  ...props
}: FormTextInputProps) {
  return (
    <p className="w-full flex flex-col">
      {label && (
        <label htmlFor={name} className="text-xs md:text-sm xl:text-lg text-sky-800">
          {label}:
        </label>
      )}
      <input type={type} name={name} id={id} {...props} />
    </p>
  );
}
