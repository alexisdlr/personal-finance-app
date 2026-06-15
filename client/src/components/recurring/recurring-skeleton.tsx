import { Skeleton } from "@/components/ui/skeleton";

const TABLE_ROWS = 5;

export default function RecurringSkeleton() {
  return (
    <div className="w-full sm:h-screen mt-6 pb-20 md:pb-4 flex flex-col">
      <Skeleton className="h-9 w-52" />

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 mt-8">
        <div className="flex flex-col gap-6">
          <div className="rounded-xl bg-black p-6">
            <Skeleton className="h-12 w-12 animate-none rounded-md bg-white/15" />
            <Skeleton className="mt-8 h-4 w-20 animate-none bg-white/15" />
            <Skeleton className="mt-2 h-10 w-36 animate-none bg-white/15" />
          </div>

          <div className="rounded-xl bg-white p-6">
            <Skeleton className="mb-5 h-6 w-24" />

            <div className="flex justify-between border-b py-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>

            <div className="flex justify-between border-b py-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-28" />
            </div>

            <div className="flex justify-between py-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6">
          <div className="hidden md:block">
            <div className="mb-2 flex rounded-lg bg-accent px-4 py-3">
              <Skeleton className="h-4 w-20 animate-none" />
              <Skeleton className="mx-auto h-4 w-20 animate-none" />
              <Skeleton className="ml-auto h-4 w-16 animate-none" />
            </div>

            <div className="divide-y divide-gray-200">
              {Array.from({ length: TABLE_ROWS }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-4"
                >
                  <Skeleton className="h-8 w-8 shrink-0 animate-none rounded-full" />
                  <Skeleton className="h-4 w-28 animate-none" />
                  <Skeleton className="mx-auto h-4 w-24 animate-none" />
                  <Skeleton className="ml-auto h-4 w-16 animate-none" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 md:hidden">
            {Array.from({ length: TABLE_ROWS }).map((_, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-14 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
