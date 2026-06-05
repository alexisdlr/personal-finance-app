"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldError } from "react-hook-form";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export default function PasswordInput({
  label,
  error,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-bold text-xs text-grey-500">{label}</label>

      <div className="relative">
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className="w-full rounded-lg ring-1 ring-beige-500 outline-none px-4 py-2 pr-12"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
}
