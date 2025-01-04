import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../redux/provider";
import { Nunito_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const nunitosans = Nunito_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Technical",
  description: "Technical",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitosans.className} `}>
        {" "}
        <Providers>
          {" "}
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
