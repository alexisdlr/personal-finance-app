import { Skeleton } from "@/components/ui/skeleton";

export default function OverviewSkeleton() {
  return (
    <div className="w-full h-full pt-6 pb-20 md:pb-4 px-3  flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-6 animate-pulse rounded-xl">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>

      {/* BALANCE SECTION */}
      <div className="py-8 pb-0 bg-white mt-6 animate-pulse rounded-xl">
        <div className="flex flex-col md:flex-row gap-5">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full flex flex-col lg:flex-row lg:gap-6 mt-8">
        {/* LEFT */}
        <div className="w-full lg:w-[58%] flex flex-col gap-6">
          {/* POTS */}
          <section className="bg-white rounded-xl p-6 animate-pulse">
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-32 flex-1 rounded-xl" />
              <Skeleton className="h-32 flex-1 rounded-xl" />
            </div>
          </section>

          {/* TRANSACTIONS */}
          <section className="bg-white rounded-xl p-6 animate-pulse">
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-5 w-20" />
            </div>

            <div className="space-y-4 ">
              {[1, 2, 3, 4, 5].map((item) => (
                <Skeleton key={item} className="h-14 w-full rounded-lg" />
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[42%] flex flex-col gap-6 mt-6 lg:mt-0">
          {/* BUDGETS */}
          <section className="bg-white rounded-xl p-6 animate-pulse">
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton className="h-40 w-40 rounded-full mx-auto" />

              <div className="flex flex-col gap-3 flex-1">
                {[1, 2, 3, 4].map((item) => (
                  <Skeleton key={item} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </section>

          {/* RECURRING BILLS */}
          <section className="bg-white rounded-xl p-6 animate-pulse">
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-7 w-40" />
              <Skeleton className="h-5 w-20" />
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <Skeleton key={item} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
