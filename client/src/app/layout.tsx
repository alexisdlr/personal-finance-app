import type { Metadata } from "next";
import localFont from "next/font/local";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import ToastProvider from "@/components/providers/toast-provider";
import ModalRenderer from "@/components/modals/modal-renderer";

import { publicSans } from "./styles/fonts";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Personal Finance App | Frontend Mentor",
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
    <html lang="en" className={`${publicSans.className}`}>
      <body>
        <ReactQueryProvider>
          <ToastProvider />
          <ModalRenderer />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
