"use client";
import * as z from "zod";

import useRegister from "@/hooks/auth/use-register";

import Link from "next/link";
import Button from "@/components/auth/button";
import { MotionDiv } from "@/components/animated/motion-div";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSchemaSignUp } from "@/lib/validator";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/auth-card";
import FormInput from "@/components/auth/forms/form-input";
import PasswordInput from "@/components/auth/forms/password-input";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UserSchemaSignUp>>({
    resolver: zodResolver(UserSchemaSignUp),
  });
  const router = useRouter();

  const { mutateAsync: signUp } = useRegister();

  const onSubmit = async (data: z.infer<typeof UserSchemaSignUp>) => {
    try {
      const res = await signUp(data); // Utiliza `login` con `mutateAsync`
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
          <h1 className="text-2xl text-grey-900 font-bold">Sign Up</h1>
        </div>
        <form
          className="w-full flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2 w-full">
            <FormInput
              label="First Name"
              type="text"
              placeholder="Enter your first name..."
              className="placeholder:text-grey-300 placeholder:text-[10px]"
              {...register("name")}
              error={errors.name}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <FormInput
              label="Last Name"
              type="text"
              placeholder="Enter your last name..."
              className="placeholder:text-grey-300 placeholder:text-[10px]"
              {...register("lastName")}
              error={errors.lastName}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email..."
              className="placeholder:text-grey-300 placeholder:text-[10px]"
              {...register("email")}
              error={errors.email}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <PasswordInput
              label="Password"
              placeholder="Enter your password..."
              className="placeholder:text-grey-300 placeholder:text-[10px]"
              {...register("password")}
              error={errors.password}
            />
          </div>
          <div>
            <Button type="submit" className="w-full font-semibold text-sm">
              Create Account
            </Button>
          </div>
        </form>
        <div className="text-sm w-full flex items-center justify-center text-grey-500">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-grey-900 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </AuthCard>
  );
};

export default SignUp;
