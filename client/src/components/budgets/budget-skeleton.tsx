import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const BudgetSkeleton = (props: Props) => {
  return (
    <div className="w-full h-full pt-6 sm:px-6 px-3 lg:px-10 flex flex-col pb-24">
      <div className="flex justify-between items-center bg-white p-6 animate-pulse rounded-xl">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white p-8 h-[500px] rounded-lg shadow-md mt-2 animate-pulse">
          <Skeleton className="h-full w-1/2 mb-4" />
        </div>
        <div className="w-full p-3 flex flex-col gap-2">
          <div className="max-w-[600px] w-full h-full">
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-2 mb-8 animate-pulse">
              <Skeleton className="h-40 w-full " />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-2 mb-8 animate-pulse">
              <Skeleton className="h-40 w-full  mb-4" />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-2 mb-8 animate-pulse">
              <Skeleton className="h-40 w-full mb-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSkeleton;
