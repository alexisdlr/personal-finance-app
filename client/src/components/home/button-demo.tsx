"use client";
import useDemoLogin from "@/hooks/auth/use-demo-login";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { LoaderCircle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonDemoProps = {
  className?: string;
  Icon?: LucideIcon;
};
const ButtonDemo = ({ className, Icon }: ButtonDemoProps) => {
  const { mutateAsync: demoLogin, isPending } = useDemoLogin();
  const router = useRouter();
  const handleDemo = async () => {
    try {
      const res = await demoLogin();

      if (res.error) {
        toast.error(res.error);
        return;
      }

      router.push("/overview");
    } catch (error) {
      toast.error("Failed to start demo");
    }
  };
  return (
    <Button
      onClick={handleDemo}
      disabled={isPending}
      className={cn(
        "bg-turquoise text-white p-5 ring-1 cursor-pointer ring-turquoise text-lg hover:bg-white hover:text-turquoise hover:ring-1 hover:ring-turquoise font-bold",
        className,
      )}
    >
      {isPending && <LoaderCircle className="size-4 animate-spin" />}
      <span>{isPending ? "Loading demo" : "Try the demo"}</span>
      {Icon && <Icon />}
    </Button>
  );
};

export default ButtonDemo;
