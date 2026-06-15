"use client";

import { MotionDiv } from "@/components/animated/motion-div";
import PotCard from "@/components/pots/pot-card";
import { Button } from "@/components/ui/button";
import { usePots } from "@/hooks/pots/use-pots";
import { useModalStore } from "@/store/modal-store";
import EmptyState from "@/components/shared/empty-state";
import PotsIcon from "@/components/Icons/pots-nav";
import { useIsDemoUser } from "@/hooks/use-is-demo-user";

const PotsPage = () => {
  const { openModal } = useModalStore();
  const { isReadOnly } = useIsDemoUser();
  const { pots } = usePots();
  return (
    <div className="w-full h-full mt-4 pb-20 md:pb-4 flex flex-col">
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mt-2"
      >
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Pots</h1>
        </div>
        {!isReadOnly && (
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              className="px-4 py-6 text-md font-bold mr-1 rounded-lg bg-black text-white"
              onClick={() => openModal("CREATE_POT")}
            >
              + Add New Pot
            </Button>
          </div>
        )}
      </MotionDiv>

      {/* GRID */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
          mt-8
        "
      >
        {pots.length === 0 ? (
          <div className="col-span-full rounded-2xl bg-white flex items-center justify-center w-full h-full p-10">
            <EmptyState
              icon={<PotsIcon color="currentColor" width={24} height={24} />}
              title="No pots yet"
              description="Create a pot to start saving for specific goals like travel, gadgets, or emergencies."
            />
          </div>
        ) : (
          pots.map((pot) => <PotCard key={pot.id} pot={pot} />)
        )}
      </MotionDiv>
    </div>
  );
};

export default PotsPage;
