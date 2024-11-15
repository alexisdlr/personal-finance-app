import Link from "next/link";
import { usePathname } from "next/navigation";
import BudgetIcon from "./Icons/budget-nav";
import OverviewIcon from "./Icons/overview-nav";
import TransactionsIcon from "./Icons/transactions-nav";
import PotsIcon from "./Icons/pots-nav";
import RecurringIcon from "./Icons/recurring-nav";

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
  }
];


const Menu = () => {
  const pathname = usePathname();

  return (
    <div className="text-sm md:mt-8 w-full flex justify-evenly md:flex-col">
      {menuItems.map(i => {
        const isActive = pathname === i.href
        const iconColor = isActive ? "#277C78" : "#B3B3B3"; // Color activo y color inactivo

        return (
          <div className={`py-2 px-6 md:px-0 xl:px-6 lg:border-4 lg:border-transparent ${isActive ? " bg-beige-100 rounded-t-lg md:rounded-b-lg lg:rounded-b-none lg:rounded-t-none lg:rounded-tr-lg border-b-4 border-b-secondary-green md:border-b-0 lg:rounded-r-lg lg:border-s-4 lg:border-s-secondary-green" : ""}`} key={i.label}>
            <Link href={i.href} key={i.label} className={`transition-all duration-150 hover:text-white flex flex-col md:flex-row items-center justify-center lg:justify-start gap-3 text-grey-300 md:px-0 md:py-2 font-bold ${isActive ? "text-grey-900 hover:text-grey-900" : "text-grey-300"}`}>
              <i.icon color={iconColor} />
              <span className={`hidden text-[10px] md:text-xs lg:block`}>{i.label}</span>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Menu