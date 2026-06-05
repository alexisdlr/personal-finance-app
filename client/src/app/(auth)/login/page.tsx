"use client";
import { useForm } from "react-hook-form";
import { UserSchemaLogin } from "@/lib/validator";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import * as z from "zod";
import useLogin from "@/hooks/useLogin";
import toast from "react-hot-toast";

import Button from "@/components/auth/button";
import AuthCard from "@/components/auth/auth-card";
import FormInput from "@/components/auth/forms/form-input";
import PasswordInput from "@/components/auth/forms/password-input";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<z.infer<typeof UserSchemaLogin>>({
    resolver: zodResolver(UserSchemaLogin),
  });
  const router = useRouter();
  const { mutateAsync: login } = useLogin(); // Uso del hook `useLogin`

  const onSubmit = async (data: z.infer<typeof UserSchemaLogin>) => {
    try {
      const res = await login(data); // Utiliza `login` con `mutateAsync`
      if (res.error) {
        toast.error(res.error);
        return;
      }
      const mss = res.message ? res.message : "";
      toast.success(mss);
      router.push("/overview");
    } catch (error: any) {
      console.error("Login failed:", error); // Manejo de error
      toast.error(error.message);
    }
  };

  return (
    <AuthCard>
      <div className="flex flex-col items-start gap-8">
        <div>
          <h1 className="text-2xl text-grey-900 font-bold">Login</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2 w-full">
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email..."
              {...register("email")}
              error={errors.email}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <PasswordInput
              label="Password"
              placeholder="Enter your password..."
              {...register("password")}
              error={errors.password}
            />
          </div>
          <div>
            {isLoading ? (
              <div className="flex items-center justify-center w-full min-h-full bg-beige-100">
                <Loader2 className="animate-spin duration-300 text-grey-900" />
              </div>
            ) : (
              <Button type="submit" className="w-full font-semibold text-sm">
                Login
              </Button>
            )}
          </div>
        </form>
        <div className="text-sm w-full flex items-center justify-center text-[#696868]">
          <p>
            Need to create an Account?{" "}
            <Link href="/sign-up" className="font-bold text-grey-900 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </AuthCard>
  );
};

export default LoginPage;
