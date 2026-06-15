"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MotionDiv } from "@/components/animated/motion-div";
import AccountForm from "./account-form";
import SecurityForm from "./security-form";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import useHandleLogout from "@/hooks/auth/use-handle-logout";

const tabs = [
  { id: "account", label: "Account" },
  { id: "security", label: "Security" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const tabTransition = {
  duration: 0.25,
  ease: [0.25, 0.46, 0.45, 0.94],
} as const;

export default function ProfileContent() {
  const handleLogout = useHandleLogout();
  const [activeTab, setActiveTab] = useState<TabId>("account");

  const handleLogoutClick = () => {
    handleLogout();
  };
  return (
    <div className="w-full h-screen mt-6 pb-20 md:pb-4 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="lg:text-4xl text-3xl font-bold">Profile</h1>
          <p className="text-gray-500 mt-2 text-balance max-w-2xl">
            Manage your profile information and preferences.
          </p>
        </div>
        <Button
          variant="outline"
          className="p-6 text-lg font-semibold flex items-center gap-2 cursor-pointer"
          onClick={handleLogoutClick}
        >
          <LogOut size={30} className="size-6 mr-2" />
          Logout
        </Button>
      </div>

      <div className="w-full bg-white rounded-xl p-6 flex flex-col lg:flex-row lg:gap-8 mt-8">
        <nav className="flex lg:flex-col gap-2 border-b lg:border-b-0 lg:border-r border-gray-200 pb-4 lg:pb-0 lg:pr-6 lg:min-w-[180px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors",
                activeTab === tab.id
                  ? "bg-grey-900 text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-grey-900",
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-hidden pt-6 lg:pt-0">
          <AnimatePresence mode="wait" initial={false}>
            <MotionDiv
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={tabTransition}
            >
              {activeTab === "account" ? <AccountForm /> : <SecurityForm />}
            </MotionDiv>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
