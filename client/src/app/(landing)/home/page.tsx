import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Home",
};
type Props = {};

const Home = (props: Props) => {
  return (
    <div className="max-w-7xl mx-auto h-screen ">
      <Header />
      <main>
        <Hero />
        {/* TODO: Features, How it works, Footer */}
      </main>
    </div>
  );
};

export default Home;
