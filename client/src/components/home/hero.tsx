import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { MotionDiv } from "../animated/motion-div";

const Hero = () => {
  return (
    <div className="w-full px-4 py-24 flex items-center gap-12 justify-between">
      <MotionDiv
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
        }}
        className="max-w-3xl flex flex-col gap-10"
      >
        <div className="max-w-fit flex gap-2 items-center p-2 rounded-lg bg-accent">
          <Star size={20} fontWeight={700} className=" text-green" />
          <span className="text-turquoise text-base font-bold">
            Simplify your money management.
          </span>
        </div>
        <h2 className="text-primary-foreground text-7xl font-black">
          Take Control Of your <span className="text-turquoise">Financial</span>{" "}
          <span className="text-beige-500">Future</span>
        </h2>
        <p className="text-neutral-300 text-xl">
          Finance is a personal finance platform designed to help users track
          spending, organize income, and gain financial clarity without
          complexity.
        </p>
        <div className="flex gap-4 items-center">
          <Button className="bg-primary-foreground text-primary px-4 font-bold hover:bg-primary hover:text-white cursor-pointer">
            Start for free
          </Button>
          <Button className="bg-turquoise text-white px-4 py-4 ring-1 cursor-pointer ring-turquoise hover:bg-white hover:text-turquoise hover:ring-1 hover:ring-turquoise font-bold">
            Try the demo
          </Button>
        </div>
      </MotionDiv>
      <MotionDiv
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1,
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
    </div>
  );
};

export default Hero;
