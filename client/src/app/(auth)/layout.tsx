import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-beige-100 h-screen w-full flex flex-col lg:flex-row text-black lg:p-4 overflow-y-hidden">
      {/* LEFT */}

      <div className="w-full lg:h-full lg:rounded-xl overflow-hidden lg:w-[40%] flex items-center lg:justify-start lg:bg-auth lg:bg-cover lg:bg-top lg:relative">
        <div className="lg:hidden bg-grey-900 flex items-center justify-center p-2 w-full h-[60px]">
          <Image src="/images/logo-large.svg" width={121} height={21} alt="logo" className="" />
        </div>
        <Image src="/images/logo-large.svg" width={121} height={21} alt="logo" className="hidden lg:block absolute top-8 left-6" />
        <div className="hidden 3xl:flex max-w-lg rounded-xl absolute bottom-6 left-2 p-2 w-full bg-black bg-opacity-85 text-white flex-col items-start justify-start">
          <div className="max-w-[450px] flex flex-col gap-4">
            <h2 className=" font-bold text-2xl leading-[120%]">
              Keep track of your money
              and save for your future
            </h2>
            <p className="text-[10px] leading-[150%] text-gray-300">
              Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full h-full lg:w-[60%] flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
