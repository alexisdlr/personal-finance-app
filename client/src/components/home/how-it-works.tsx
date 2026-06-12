// components/landing/how-it-works.tsx

import { UserPlus, Receipt, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Create Your Account",
    description:
      "Sign up in seconds and securely access your personal finance dashboard.",
  },
  {
    icon: Receipt,
    number: "02",
    title: "Track Your Finances",
    description:
      "Monitor transactions, manage budgets, and keep an eye on recurring bills.",
  },
  {
    icon: Target,
    number: "03",
    title: "Achieve Your Goals",
    description:
      "Build savings pots, control spending, and stay on track toward financial freedom.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 px-5 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className=" text-center max-w-3xl mx-auto">
          <span className="inline-flex  items-center rounded-full border shadow-2xl shadow-green border-beige-500/30 bg-white px-4 py-2 text-sm font-bold ring-1 ring-neutral-500 text-grey-500">
            How It Works
          </span>

          <h2 className="mt-12 text-4xl md:text-6xl font-extrabold text-grey-900">
            Take control of your finances in three simple steps
          </h2>

          <p className="mt-8 text-sm lg:text-lg text-grey-500">
            Everything you need to track spending, manage budgets, and build
            better financial habits.
          </p>
        </div>

        {/* Steps */}

        <div className="px-4 lg:px-0 relative mt-20">
          {/* Connection line */}

          <div className="hidden lg:block absolute top-20 left-0 right-0 h-px bg-grey-100" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="
                    relative
                    bg-white
                    rounded-3xl
                    border
                    border-grey-100
                    p-8
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-xl
                  "
                >
                  {/* Number */}

                  <div className="absolute top-6 right-6 text-sm font-bold text-grey-300">
                    {step.number}
                  </div>

                  {/* Icon */}

                  <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-green/10">
                    <Icon className="text-green" size={28} />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-grey-900">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-grey-500 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-green font-semibold">
                    <Link href={"/login"}>
                      Learn more
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
