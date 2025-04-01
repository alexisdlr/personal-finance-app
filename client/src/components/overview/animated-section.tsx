import { MotionDiv } from "@/components/animated/motion-div";
import Link from "next/link";
import Image from "next/image";

interface AnimatedSectionProps {
  title: string;
  link?: string;
  linkHref?: string;
  children: React.ReactNode;
}

const AnimatedSection = ({ title, link, linkHref, children }: AnimatedSectionProps) => (
  <MotionDiv initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="py-6 w-full">
    <div className="flex flex-col bg-white p-8 rounded-xl gap-5 items-center">
      <div className="w-full flex justify-between">
        <h2 className="text-grey-900 font-bold text-3xl">{title}</h2>
        {link && (
          <div className="flex gap-2 items-center">
            <Link href={linkHref || "#"} className="text-sm text-grey-500 transition-all duration-200 hover:underline">
              {link}
            </Link>
            <Image src={'/images/icon-caret-right.svg'} alt="caret right" width={6} height={6} />
          </div>
        )}
      </div>
      {children}
    </div>
  </MotionDiv>
);

export default AnimatedSection;