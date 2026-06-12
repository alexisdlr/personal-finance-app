"use client";
import Link from "next/link";
import { MotionHeader } from "../animated/motion-header";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Logo, LogoDark } from "../shared/logo";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <MotionHeader
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx("w-full z-10 sticky top-0 transition-all duration-300", {
        "bg-secondary/90 border-ring border-b backdrop-blur-md": scrolled,
        "bg-primary": !scrolled,
      })}
    >
      <div className="flex justify-between px-4 py-6.5 lg:max-w-7xl 2xl:max-w-400 mx-auto">
        <div>
          {scrolled ? (
            <Link
              href={"/"}
              className="flex items-center justify-center lg:justify-start gap-2 "
            >
              <LogoDark />
            </Link>
          ) : (
            <Link
              href={"/"}
              className="flex items-center justify-center lg:justify-start gap-2 "
            >
              <Logo />
            </Link>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <Button
            variant={"secondary"}
            className="px-8 py-5 font-bold text-md ring-1"
          >
            <Link href={"/login"}>Log In</Link>
          </Button>
          <Button className="px-8 py-5.5 text-md cursor-pointer hover:opacity-70">
            Book a demo <ArrowRight />
          </Button>
        </div>
      </div>
    </MotionHeader>
  );
};

export default Header;
