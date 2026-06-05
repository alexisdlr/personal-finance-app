export default function OverviewSkeleton() {
  return (
    <div className="w-full h-full pt-6 pb-20 md:pb-4 px-6 lg:px-10 animate-pulse">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="h-10 w-48 rounded bg-gray-200" />
        <div className="h-10 w-28 rounded-lg bg-gray-200" />
      </div>

      {/* BALANCE CARDS */}
      <div className="py-8 pb-0">
        <div className="flex flex-col md:flex-row gap-5">
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-full h-32 rounded-xl bg-gray-200" />
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full flex flex-col lg:flex-row lg:gap-6 mt-8">
        {/* LEFT */}
        <div className="w-full lg:w-[58%] flex flex-col gap-6">
          {/* POTS */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between mb-6">
              <div className="h-6 w-24 bg-gray-200 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
            </div>

            <div className="h-36 bg-gray-200 rounded-xl" />
          </div>

          {/* TRANSACTIONS */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between mb-6">
              <div className="h-6 w-36 bg-gray-200 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="h-14 rounded-lg bg-gray-200" />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[42%] flex flex-col gap-6 mt-6 lg:mt-0">
          {/* BUDGETS */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between mb-6">
              <div className="h-6 w-24 bg-gray-200 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-40 h-40 rounded-full bg-gray-200 mx-auto" />

              <div className="flex-1 space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-12 rounded-lg bg-gray-200" />
                ))}
              </div>
            </div>
          </div>

          {/* RECURRING BILLS */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between mb-6">
              <div className="h-6 w-40 bg-gray-200 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-16 rounded-lg bg-gray-200" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
