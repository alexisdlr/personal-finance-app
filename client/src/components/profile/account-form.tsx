"use client";

import { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import axios from "axios";

import useUpdateProfile from "@/hooks/profile/use-update-profile";
import { useIsDemoUser } from "@/hooks/use-is-demo-user";
import { useAuthStore } from "@/store/auth-store";
import { UpdateProfileSchema } from "@/lib/validator";

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

export default function AccountForm() {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);
  const { isReadOnly } = useIsDemoUser();
  const updateProfileMutation = useUpdateProfile();

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user?.name ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user, form]);

  const onSubmit = async (data: z.infer<typeof UpdateProfileSchema>) => {
    if (isReadOnly) {
      toast.error("Demo account is read-only");
      return;
    }

    try {
      const response = await updateProfileMutation.mutateAsync(data);

      if (response.error) {
        toast.error(response.error);
        return;
      }

      if (response.user) {
        updateUser({
          id: String(response.user.id),
          name: response.user.name,
          lastName: response.user.lastName,
          email: response.user.email,
        });
      }

      toast.success(response.message || "Profile updated successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Failed to update profile");
        return;
      }

      toast.error("Failed to update profile");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-grey-900">Account</h2>
          <p className="mt-1 text-sm text-gray-500">
            {isReadOnly
              ? "Your account details are shown below in read-only mode."
              : "Update your personal information."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    disabled={isReadOnly}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    disabled={isReadOnly}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  disabled={isReadOnly}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!isReadOnly && (
          <Button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="px-6 py-5 text-sm font-semibold"
          >
            {updateProfileMutation.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        )}
      </form>
    </Form>
  );
}
