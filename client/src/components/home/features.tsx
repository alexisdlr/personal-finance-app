import React from "react";
import FeatureCards from "./features-cards";

const Features = () => {
  return (
    <section className="w-full py-28 flex flex-col items-center gap-12 justify-between">
      <div className="flex flex-col items-center gap-12">
        <div className="flex justify-center items-center shadow-2xl shadow-green py-1.5 px-4 rounded-4xl bg-white ring-1 ring-neutral-500">
          <span className="font-bold text-sm">Features</span>
        </div>
        <div className="max-w-3xl h-full relative">
          <div className=" flex flex-col gap-6">
            <h2 className="font-extrabold text-6xl text-center">
              All here is what you need
            </h2>
            <p className="text-center text-lg text-muted-foreground">
              Manage your financial journey effortlessly with a comprehensive
              suite of tools designed to simplify, analyze, and personalize your
              experience.
            </p>
          </div>
        </div>
      </div>

      {/* CARDS */}
      <FeatureCards />
    </section>
  );
};

export default Features;
