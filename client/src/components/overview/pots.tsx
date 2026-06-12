import React from "react";
import AnimatedSection from "./animated-section";
import TotalSaved from "../shared/total-saved";
import PotsList from "./pots-list";
import { PotData } from "@/types/api";

type Props = {
  totalSaved: number;
  pots: PotData[];
};

const Pots = ({ totalSaved, pots }: Props) => {
  return (
    <div className="area-pots">
      <AnimatedSection title="Pots" link="See Details" linkHref="/pots">
        <div className="w-full flex flex-col gap-6 md:flex-row justify-between">
          <TotalSaved total={totalSaved} />
          <PotsList pots={pots} />
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Pots;
