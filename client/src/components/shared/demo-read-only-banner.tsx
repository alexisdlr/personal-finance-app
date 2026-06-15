import { Info } from "lucide-react";

export default function DemoReadOnlyBanner() {
  return (
    <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <Info className="mt-0.5 size-4 shrink-0" />
      <p>
        You are using a demo account. You can explore the app, but creating and
        editing resources is disabled.
      </p>
    </div>
  );
}
