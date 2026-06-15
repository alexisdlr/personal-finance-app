"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";

import useChangePassword from "@/hooks/profile/use-change-password";
import { useIsDemoUser } from "@/hooks/use-is-demo-user";
import { ChangePasswordSchema } from "@/lib/validator";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
};

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="pr-12"
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default function SecurityForm() {
  const { isReadOnly } = useIsDemoUser();
  const changePasswordMutation = useChangePassword();

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ChangePasswordSchema>) => {
    if (isReadOnly) {
      toast.error("Demo account is read-only");
      return;
    }

    try {
      const response = await changePasswordMutation.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response.error) {
        toast.error(response.error);
        return;
      }

      form.reset();
      toast.success(response.message || "Password updated successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Failed to update password");
        return;
      }

      toast.error("Failed to update password");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-grey-900">Security</h2>
          <p className="mt-1 text-sm text-gray-500">
            {isReadOnly
              ? "Password changes are disabled for demo accounts."
              : "Change your password to keep your account secure."}
          </p>
        </div>

        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordField
                  label="Current Password"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter your current password"
                  disabled={isReadOnly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordField
                  label="New Password"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter your new password"
                  disabled={isReadOnly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <PasswordField
                  label="Confirm New Password"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Confirm your new password"
                  disabled={isReadOnly}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isReadOnly && (
          <Button
            type="submit"
            disabled={changePasswordMutation.isPending}
            className="px-6 py-5 text-sm font-semibold"
          >
            {changePasswordMutation.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        )}
      </form>
    </Form>
  );
}
