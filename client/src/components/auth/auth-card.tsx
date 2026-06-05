import { MotionDiv } from "@/components/animated/motion-div";

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl bg-white p-8 rounded-xl"
    >
      {children}
    </MotionDiv>
  );
}
