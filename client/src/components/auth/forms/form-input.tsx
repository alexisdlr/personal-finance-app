import { FieldError } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export default function FormInput({ label, error, ...props }: FormInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-bold text-xs text-grey-500" htmlFor={label}>
        {label}
      </label>

      <input
        {...props}
        id={label}
        className="w-full rounded-lg ring-1 ring-beige-500 outline-none px-4 py-2"
      />

      {error && (
        <p className="text-red-500 text-xs text-right mt-1">{error.message}</p>
      )}
    </div>
  );
}
