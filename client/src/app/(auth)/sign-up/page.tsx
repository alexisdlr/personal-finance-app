import { MotionDiv } from "@/components/animated/motion-div";
import SignUpForm from "@/components/auth/forms/sign-up-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign Up",
};
const SignUp = () => {
  return (
    <div className="flex min-h-[85svh] w-full flex-col items-center justify-center p-6 lg:min-h-svh lg:p-10">
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg lg:max-w-4xl "
      >
        <SignUpForm />
      </MotionDiv>
    </div>
  );
};

export default SignUp;
