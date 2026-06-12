"use client";
import { LoaderCircle, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { MotionDiv } from "../animated/motion-div";
import useDemoLogin from "@/hooks/auth/use-demo-login";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Hero = () => {
  const { mutateAsync: demoLogin, isPending } = useDemoLogin();
  const router = useRouter();
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
  return (
    <section className="w-full max-w-7xl mx-auto px-8 md:px-4 py-24 flex flex-col md:flex-row items-center gap-12 justify-between">
      <MotionDiv
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
        }}
        className="max-w-3xl flex flex-col gap-10"
      >
        <div className="max-w-fit flex gap-2 items-center p-2 rounded-lg bg-turquoise">
          <Star size={20} fontWeight={700} className=" text-beige-100" />
          <span className="text-beige-100 text-base font-bold">
            Simplify your money management.
          </span>
        </div>
        <h2 className="text-primary text-5xl text-center md:text-7xl font-black">
          Take Control Of your <span className="text-turquoise">Financial</span>{" "}
          <span className="text-beige-500">Future</span>
        </h2>
        <p className="text-neutral-500 text-base md:text-xl">
          Finance is a personal finance platform designed to help users track
          spending, organize income, and gain financial clarity without
          complexity.
        </p>
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <Button className="bg-primary-foreground text-primary p-5 font-bold ring-1 ring-black hover:bg-primary hover:text-white cursor-pointer text-lg">
            Start for free
          </Button>
          <span className="text-lg text-beige-500">Or</span>
          <Button
            onClick={handleDemo}
            disabled={isPending}
            className="bg-turquoise text-white p-5 ring-1 cursor-pointer ring-turquoise text-lg hover:bg-white hover:text-turquoise hover:ring-1 hover:ring-turquoise font-bold"
          >
            {isPending && <LoaderCircle className="size-4 animate-spin" />}
            <span>{isPending ? "Loading demo" : "Try the demo"}</span>
          </Button>
        </div>
      </MotionDiv>
      <MotionDiv
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.3,
        }}
        className="w-full h-full mx-auto"
      >
        <Image
          src={"/images/hero.png"}
          width={850}
          height={850}
          style={{
            borderRadius: "1rem",
            boxShadow: "10px 10px 50px 1px  hsl(180, 16%, 42%)",
          }}
          alt="Hero png"
        />
      </MotionDiv>
    </section>
  );
};

export default Hero;
