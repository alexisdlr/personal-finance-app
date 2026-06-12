import { NavIcons } from "@/components/shared/nav-icons";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}
export const menuItems: MenuItem[] = [
  {
    icon: NavIcons.overview,
    label: "Overview",
    href: "/overview",
  },
  {
    icon: NavIcons.budgets,
    label: "Budgets",
    href: "/budgets",
  },
  {
    icon: NavIcons.transactions,
    label: "Transactions",
    href: "/transactions",
  },
  {
    icon: NavIcons.pots,
    label: "Pots",
    href: "/pots",
  },
  {
    icon: NavIcons.recurringBills,
    label: "Recurring Bills",
    href: "/recurring",
  },
  {
    icon: NavIcons.profile,
    label: "Profile",
    href: "/profile",
  },
];
