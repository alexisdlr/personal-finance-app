import type { Metadata } from "next";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Personal Finance App",
  description: "Solution to the Frontend Mentor Personal Finance App challenge",
  creator: "Alexis De Leon",
  authors: [{ name: "Alexis De Leon", url: "https://github.com/alexisdlr" }],
  openGraph: {
    title: "Personal Finance App",
    description: "Track budgets and savings goals",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full h-full bg-primary">{children}</div>
    </>
  );
}
