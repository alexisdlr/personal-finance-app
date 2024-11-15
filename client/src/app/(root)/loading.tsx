import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-beige-100">
      <Loader2 className="animate-spin duration-300 text-grey-900" />
    </div>
  );
};

export default Loading;