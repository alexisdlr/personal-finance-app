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

const Home = () => {
  return (
    <div className=" h-full">
      <Header />
      <main className="w-full h-full">
        <Hero />

        <Features />
        <HowItWorks />
        <Banner />
      </main>
    </div>
  );
};

export default Home;
