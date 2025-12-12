import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Etihadsouq eCommerce Manager",
  description: "Order Manager & more",
};

const dm_sans = DM_Sans();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dm_sans.className} antialiased`}
      >
        {children}
        <Toaster
          position="top-center"
        />
      </body>
    </html>
  );
}
