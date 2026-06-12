import { menuItems } from "@/lib/menu-items";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

export function BottomNav({}) {
  const pathname = usePathname();

  return (
    <nav
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      className="bg-primary fixed right-0 bottom-0 left-0 z-50 rounded-t-md px-4 pt-2 md:px-10 lg:hidden"
    >
      <div className="flex items-end justify-between gap-1">
        {menuItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "group flex min-h-11 w-full flex-col items-center justify-center gap-1 rounded-t-md border-b-4 sm:min-h-16.5",
                active
                  ? "bg-secondary text-primary border-chart-1"
                  : "text-ring hover:bg-background/10 hover:text-background border-transparent",
              )}
            >
              <span
                className={clsx(
                  "shrink-0 transition-colors",
                  active
                    ? "text-chart-1"
                    : "text-ring group-hover:text-background",
                )}
              >
                {item.icon}
              </span>

              <span className="hidden text-xs font-bold whitespace-nowrap sm:block">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
export default BottomNav;
