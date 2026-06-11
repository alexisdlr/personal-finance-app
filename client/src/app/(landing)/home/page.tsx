import Banner from "@/components/home/cta-banner";
import Features from "@/components/home/features";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home",
};
type Props = {};

const Home = (props: Props) => {
  return (
    <div className=" h-full">
      <Header />
      <main className="max-w-7xl mx-auto">
        <Hero />
        <Features />
        <HowItWorks />
        <Banner />

        {/* TODO: Features, How it works, Footer */}
      </main>
    </div>
  );
};

export default Home;
