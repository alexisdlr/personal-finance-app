"use client";
import { useForm } from "react-hook-form";
import { UserSchemaLogin } from "@/lib/validator";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import * as z from "zod";
import useLogin from "@/hooks/auth/use-login";
import toast from "react-hot-toast";
import FormInput from "@/components/auth/forms/form-input";
import PasswordInput from "@/components/auth/forms/password-input";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Illustration from "../illustration";
import useDemoLogin from "@/hooks/auth/use-demo-login";
import { Button } from "@/components/ui/button";

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<z.infer<typeof UserSchemaLogin>>({
    resolver: zodResolver(UserSchemaLogin),
  });
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin(); // Uso del hook `useLogin`
  const {
    mutateAsync: demoLogin,
    isPending: demoLoading,
    error: demoError,
  } = useDemoLogin();

  const handleDemo = async () => {
    try {
      const res = await demoLogin();

      if (res.error) {
        toast.error(res.error);
        return;
      }

      router.push("/overview");
    } catch (error) {
      toast.error("Failed to start demo");
    }
  };

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
      toast.error(error.message);
    }
  };
  const authInProgress = isLoading || isPending;
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 lg:grid-cols-2">
          <Illustration />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-6 p-6 lg:p-8"
          >
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl text-grey-900 font-bold">Welcome Back</h1>
              <p>Log in your account</p>
            </div>
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
              <Button
                type="submit"
                className="w-full font-semibold py-6 cursor-pointer flex items-center gap-2 justify-center"
                disabled={authInProgress}
              >
                <span className="flex items-center gap-2">
                  {authInProgress && (
                    <LoaderCircle className="size-4 animate-spin" />
                  )}
                  <span className="text-center text-base">
                    {authInProgress ? "Logging in" : "Login"}
                  </span>
                </span>
              </Button>
            </div>
            <div className="text-sm w-full flex items-center justify-center text-[#696868]">
              <p>
                Need to create an Account?{" "}
                <Link
                  href="/sign-up"
                  className="font-bold text-grey-900 underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
            {/* Demo login */}
            <hr className="w-full size-0.5 rounded-2xl bg-primary" />
            <div className="flex flex-col items-center gap-2">
              <Button
                type="button"
                onClick={handleDemo}
                disabled={demoLoading}
                className="bg-transparent py-6 text-primary border border-black hover:bg-transparent focus-visible:outline-primary/90 hover:border-chart-1 hover:text-chart-1 w-full transform cursor-pointer rounded-lg px-8  text-sm font-semibold transition focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="flex items-center justify-center gap-2">
                  {demoLoading && (
                    <LoaderCircle className="size-4 animate-spin" />
                  )}
                  <span className="font-bold">
                    {demoLoading ? "Loading demo" : "Try the demo"}
                  </span>
                </span>
              </Button>
              {demoError && (
                <p className="text-destructive text-xs">{demoError.message}</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
