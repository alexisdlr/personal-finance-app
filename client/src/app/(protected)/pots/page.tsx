"use client";

import { MotionDiv } from "@/components/animated/motion-div";
import PotCard from "@/components/pots/pot-card";
import { Button } from "@/components/ui/button";
import { usePots } from "@/hooks/pots/use-pots";
import { useModalStore } from "@/store/modal-store";

const PotsPage = () => {
  const { openModal } = useModalStore();
  const { pots } = usePots();
  return (
    <div className="w-full h-full  pt-6 pb-20 md:pb-4 px-6 lg:px-10 flex flex-col">
      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mt-2"
      >
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Pots</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            className="px-4 py-6 text-md font-bold mr-1 rounded-lg bg-black text-white"
            onClick={() => openModal("CREATE_POT")}
          >
            + Add New Pot
          </Button>
        </div>
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
        {pots.map((pot) => (
          <PotCard key={pot.id} pot={pot} />
        ))}
      </MotionDiv>
    </div>
  );
};

export default PotsPage;
