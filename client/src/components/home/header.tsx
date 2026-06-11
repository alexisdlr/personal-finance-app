import Link from "next/link";
import { MotionHeader } from "../animated/motion-header";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const Header = () => {
  return (
    <MotionHeader
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between px-4 py-6">
        <div>
          <Link
            href={"/"}
            className="flex items-center justify-center lg:justify-start gap-2 "
          >
            <Image
              src={"/images/logo-large.svg"}
              width={150}
              height={20}
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant={"secondary"} className="px-8 py-5 font-bold text-md">
            <Link href={"/login"}>Log In</Link>
          </Button>
          <Button className="text-md cursor-pointer hover:opacity-70">
            Book a demo <ArrowRight />
          </Button>
        </div>
      </div>
    </MotionHeader>
  );
};

export default Header;
