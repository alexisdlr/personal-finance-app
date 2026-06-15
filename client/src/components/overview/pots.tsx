import React from "react";
import { PotData } from "@/types/api";
import Image from "next/image";
import { NavIcons } from "../shared/nav-icons";
import Link from "next/link";
import { MotionDiv } from "../animated/motion-div";
import EmptyState from "../shared/empty-state";
import PotsIcon from "../Icons/pots-nav";

type Props = {
  totalSaved: number;
  pots: PotData[];
};

const Pots = ({ totalSaved, pots }: Props) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="area-pots bg-background rounded-12 grid min-h-54.5 grid-cols-1 gap-5 px-5 py-6 sm:p-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-primary text-xl font-bold">Pots</h2>
        <Link
          className="group hover:text-primary text-muted-foreground focus-visible:outline-primary flex items-center gap-3 rounded-xs text-sm capitalize transition-colors focus-visible:outline-1"
          href="/pots"
        >
          See details
          {NavIcons.chevronRight}
        </Link>
      </div>

      {pots.length === 0 ? (
        <EmptyState
          icon={<PotsIcon color="currentColor" width={24} height={24} />}
          title="No pots yet"
          description="Create a pot to start saving for specific goals like travel, gadgets, or emergencies."
        />
      ) : (
        <div className="@container">
          <div className="grid gap-5 @lg:grid-cols-2">
            <div className="bg-secondary rounded-12 flex min-w-0 items-center gap-5.5 p-5">
              <Image
                className="h-fit w-auto"
                width={20}
                height={20}
                alt=""
                src="/images/icon-pot.svg"
              />
              <div className="flex flex-col gap-3">
                <p className="text-muted-foreground text-sm">Total Saved</p>
                <p className="text-primary text-32 leading-[1.2] font-bold">
                  ${totalSaved.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {pots.slice(0, 4).map((pot) => (
                <div key={pot.id} className="flex items-center gap-4">
                  <div
                    className="w-1 self-stretch rounded-full"
                    style={{ backgroundColor: pot.theme }}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground text-xs">
                      {pot.name}
                    </span>
                    <span className="text-primary text-sm font-bold">
                      ${pot.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </MotionDiv>
  );
};

export default Pots;
