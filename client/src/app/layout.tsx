import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import ToastProvider from "@/components/providers/toast-provider";

const publicSans = localFont({
  src: "./fonts/PublicSans-VariableFont_wght.ttf",
  variable: "--font-public-sans-mono",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Personal Finance App | Frontend Mentor",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable}`}
      >
        <ReactQueryProvider>
          <ToastProvider />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
