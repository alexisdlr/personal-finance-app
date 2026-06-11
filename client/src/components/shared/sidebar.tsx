"use client";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./logo";
import Menu from "./menu";
import { MotionAside } from "../animated/motion-aside";
import { AnimatePresence } from "framer-motion";
import { MotionDiv } from "../animated/motion-div";
import { ArrowBigRightDash } from "lucide-react";
import { NavIcons } from "./nav-icons";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <MotionAside
      animate={{ width: collapsed ? 88 : "100%" }}
      initial={false}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className=" z-50 h-screen bottom-0 left-0 w-full max-w-75 py-2 md:py-6  bg-grey-900 rounded-tr-xl  lg:rounded-e-xl lg:rounded-r-xl "
    >
      <div className="flex items-center border-l-4 border-transparent px-8 py-10">
        {collapsed ? NavIcons.logoSmall : NavIcons.logoApp}
      </div>
      <div className="flex flex-col h-200">
        <nav className="flex-1">
          <Menu collapsed={collapsed} />
        </nav>
        <div className="border-background/10 relative my-2 w-full border-t pl-8" />

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          aria-label={collapsed ? "Expand menu" : "Minimize menu"}
          className="group text-ring hover:bg-background/10 hover:text-background rounded-r-12 flex min-h-14 w-full cursor-pointer items-center gap-5 border-l-4 border-transparent py-4 pl-4"
        >
          <MotionDiv
            animate={{ rotate: !collapsed ? 180 : 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-ring group-hover:text-background shrink-0 transition-colors duration-200"
          >
            <ArrowBigRightDash size={30} />
          </MotionDiv>

          <AnimatePresence initial={false}>
            {!collapsed && (
              <MotionDiv
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="text-base font-bold whitespace-nowrap"
              >
                Minimize Menu
              </MotionDiv>
            )}
          </AnimatePresence>
        </button>
      </div>
    </MotionAside>
  );
};

export default Sidebar;
