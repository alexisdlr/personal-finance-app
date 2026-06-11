import localFont from "next/font/local";

export const publicSans = localFont({
  src: [
    {
      path: "../../../public/fonts/PublicSans-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../../../public/fonts/PublicSans-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-public-sans",
  display: "swap",
});
