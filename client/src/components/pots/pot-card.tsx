import { Pot } from "@/types/global";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";

type PotCardProps = {
  pot: Pot;
};

const PotCard = ({ pot }: PotCardProps) => {
  const progress = (pot.total / pot.target) * 100;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div
            className="size-4 rounded-full"
            style={{ backgroundColor: pot.theme }}
          />

          <h2 className="text-xl font-bold">{pot.name}</h2>
        </div>

        <Button variant="ghost" size="icon">
          ...
        </Button>
      </div>

      {/* Amount */}
      <div className="flex items-end justify-between mb-5">
        <span className="text-sm text-gray-500">Total Saved</span>

        <span className="text-4xl font-bold">{formatPrice(pot.total)}</span>
      </div>

      {/* Progress */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: pot.theme,
          }}
        />
      </div>

      {/* Stats */}
      <div className="flex justify-between mt-3 text-xs text-gray-500">
        <span>{progress.toFixed(1)}%</span>

        <span>Target of {formatPrice(pot.target)}</span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <Button variant="secondary" className="font-bold bg-[#F8F4F0] py-6">
          + Add Money
        </Button>

        <Button variant="secondary" className="font-bold bg-[#F8F4F0] py-6">
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default PotCard;
