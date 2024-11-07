import Image from "next/image";
import Link from "next/link";

const menuItems = [

  {
    icon: "/images/icon-nav-overview.svg",
    label: "Overview",
    href: "/overview",
  },
  {
    icon: "/images/icon-nav-budgets.svg",
    label: "Budgets",
    href: "/budgets",
  },
  {
    icon: "/images/icon-nav-transactions.svg",
    label: "Transactions",
    href: "/transactions",
  },
  {
    icon: "/images/icon-nav-pots.svg",
    label: "Pots",
    href: "/pots",
  },
  {
    icon: "/images/icon-nav-recurring-bills.svg",
    label: "Recurring Bills",
    href: "/recurring",
  }



];

const Menu = () => {
  return (
    <div className="text-sm mt-8">
      {menuItems.map(i => (
        <div className="py-2" key={i.label}>
          <Link href={i.href} key={i.label} className="flex items-center justify-center lg:justify-start gap-2 text-grey-300 py-2 font-bold">
              <Image src={i.icon} width={18} height={18} alt="menu-item" />
              <span className="hidden lg:block text-grey-300 text-xs">{i.label}</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Menu