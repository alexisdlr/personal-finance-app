import React from "react";
import AnimatedSection from "./animated-section";
import RecurringBillsData from "./recurring-bills-data";

type Props = {
  recurringData: {
    paidBills: number;
    dueSoon: number;
    totalUpcoming: number;
  };
};

const Recurring = ({ recurringData }: Props) => {
  return (
    <div className="area-bills">
      <AnimatedSection
        title="Recurring Bills"
        link="See Details"
        linkHref="/recurring"
      >
        <div className="w-full h-full flex flex-col gap-3 md:flex-row justify-between">
          <RecurringBillsData recurringData={recurringData} />
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Recurring;
