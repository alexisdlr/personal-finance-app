import React from "react";
import { FeatureCard } from "./feature-card";
import { Wallet, BarChart3, PiggyBank } from "lucide-react";
type Props = {};

const FeatureCards = (props: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
      <FeatureCard
        title="Smart Budgeting"
        description="Create budgets per category, watch spending progress in real time, and see the latest three transactions per budget."
        color="bg-turquoise"
        Icon={Wallet}
      />

      <FeatureCard
        title="Financial Insights"
        description="Visualize your finances with detailed charts and analytics."
        color="bg-beige-500"
        Icon={BarChart3}
      />

      <FeatureCard
        title="Savings Goals"
        description="Set savings targets and monitor your progress effortlessly."
        color="bg-purple"
        Icon={PiggyBank}
      />
    </div>
  );
};

export default FeatureCards;
