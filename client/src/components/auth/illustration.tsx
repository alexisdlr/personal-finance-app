import { Logo } from "../shared/logo";

export default function Illustration() {
  return (
    <div
      className="hidden flex-col items-start justify-between p-5 lg:flex"
      style={{
        backgroundImage: "url('/images/illustration-authentication.svg')",
        height: "100%",
        backgroundSize: "cover",
      }}
    >
      <div className="flex items-center">
        <Logo />
      </div>
    </div>
  );
}
