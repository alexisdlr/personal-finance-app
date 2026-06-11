import { usePathname } from "next/navigation";
import Link from "next/link";
import OverviewIcon from "../Icons/overview-nav";
import BudgetIcon from "../Icons/budget-nav";
import TransactionsIcon from "../Icons/transactions-nav";
import PotsIcon from "../Icons/pots-nav";
import RecurringIcon from "../Icons/recurring-nav";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import { MotionDiv } from "../animated/motion-div";

type MenuProps = {
  collapsed: boolean;
};

const menuItems = [
  {
    icon: OverviewIcon,
    label: "Overview",
    href: "/overview",
  },
  {
    icon: BudgetIcon,
    label: "Budgets",
    href: "/budgets",
  },
  {
    icon: TransactionsIcon,
    label: "Transactions",
    href: "/transactions",
  },
  {
    icon: PotsIcon,
    label: "Pots",
    href: "/pots",
  },
  {
    icon: RecurringIcon,
    label: "Recurring Bills",
    href: "/recurring",
  },
];

const Menu = ({ collapsed }: MenuProps) => {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "text-sm lg:mt-8 w-full flex flex-col items-center",
        collapsed ? "pr-2" : "pr-6",
      )}
    >
      {menuItems.map((i) => {
        const isActive = pathname === i.href;
        const iconColor = isActive ? "#277C78" : "#B3B3B3"; // Color activo y color inactivo

        return (
          <div
            className={clsx(
              `py-2 w-full lg:border-4 lg:border-transparent`,
              isActive
                ? "bg-beige-100 rounded-t-lg md:rounded-b-lg lg:rounded-b-none lg:rounded-t-none lg:rounded-tr-lg border-b-4 border-b-secondary-green md:border-b-0 lg:rounded-r-lg lg:border-s-4 lg:border-s-secondary-green"
                : "",
            )}
            key={i.label}
          >
            <Link
              href={i.href}
              aria-label={i.label}
              aria-current={isActive ? "page" : undefined}
              className={clsx(
                "group rounded-r-12 flex min-h-14 items-center gap-5 border-l-4 py-4 pl-6 transition-colors",
                collapsed ? "px-0" : "px-4",
                isActive
                  ? "bg-secondary text-primary border-chart-1"
                  : "text-ring hover:bg-background/10 hover:text-background border-transparent",
              )}
            >
              <span
                className={clsx(
                  "shrink-0 transition-colors",
                  isActive
                    ? "text-chart-1"
                    : "text-ring group-hover:text-background",
                )}
              >
                <i.icon color={iconColor}></i.icon>
              </span>

              {!collapsed && (
                <AnimatePresence initial={false}>
                  <MotionDiv
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="text-base font-bold whitespace-nowrap"
                  >
                    {i.label}
                  </MotionDiv>
                </AnimatePresence>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
