import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const Banner = (props: Props) => {
  return (
    <section className="relative overflow-hidden rounded-[32px] py-24 px-6 md:px-12">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-turquoise/90  to-[#F8F4EF]" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)
            `,
            backgroundSize: "85px 85px",
          }}
        />
      </div>

      {/* Glow */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-white/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2 className="max-w-3xl text-4xl font-bold leading-tight text-primary md:text-6xl">
          Ready to Take Charge
          <br />
          of Your Finances?
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-grey-600">
          Join thousands of users managing budgets, tracking spending, and
          building better financial habits every day.
        </p>

        <Link
          href="/signup"
          className="
            mt-10
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-grey-900
            px-8
            py-4
            font-semibold
            text-white
            transition-all
            hover:scale-105
          "
        >
          Get Started
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default Banner;
