import { Metadata } from "next";
import LoginForm from "@/components/auth/forms/login-form";
import { MotionDiv } from "@/components/animated/motion-div";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <>
      <div className="flex min-h-[85svh] w-full flex-col items-center justify-center p-6 lg:min-h-svh lg:p-10">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg lg:max-w-4xl "
        >
          <LoginForm />
        </MotionDiv>
      </div>
    </>
  );
};

export default LoginPage;
