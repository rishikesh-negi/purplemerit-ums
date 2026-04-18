import {
  useImperativeHandle,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
  type SubmitEvent,
} from "react";

export type FormApi = {
  clear: () => void;
};

type FormProps = ComponentPropsWithoutRef<"form"> & {
  heading?: string;
  children: ReactNode;
  onSave: <T>(data: T) => void;
  ref: Ref<FormApi>;
};

export default function Form<T>({ heading, children, onSave, ref, ...props }: FormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    clear: () => formRef.current?.reset(),
  }));

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as T;
    onSave<T>(data);
  }

  return (
    <form ref={formRef} {...props} onSubmit={handleSubmit}>
      {heading && (
        <h3 className=" w-full text-center heading-secondary py-4 border-b border-gray-200">
          {heading}
        </h3>
      )}
      {children}
    </form>
  );
}
