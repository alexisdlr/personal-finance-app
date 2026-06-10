import { Pot, Transaction } from "@/types/global";
import Pots from "./pots-overview";
import Transactions from "./transactions-overview";
import TotalSaved from "../total-saved";
import AnimatedSection from "./animated-section";

type OverviewLeftProps = {
  totalSaved: number;
  pots: Pot[];
  transactions: Transaction[];
};

const OverviewLeft = ({
  totalSaved,
  pots,
  transactions,
}: OverviewLeftProps) => {
  return (
    <div className="w-full lg:w-[58%]">
      {/* POTS SECTION */}
      <AnimatedSection title="Pots" link="See Details" linkHref="/pots">
        <div className="w-full flex flex-col gap-6 md:flex-row justify-between">
          <TotalSaved total={totalSaved} />
          <Pots pots={pots} />
        </div>
      </AnimatedSection>

      {/* TRANSACTIONS SECTION */}
      <AnimatedSection
        title="Transactions"
        link="See Details"
        linkHref="/transactions"
      >
        <div className="w-full flex flex-col gap-6 md:flex-row justify-between">
          <Transactions transactions={transactions} />
        </div>
      </AnimatedSection>
    </div>
  );
};

export default OverviewLeft;
