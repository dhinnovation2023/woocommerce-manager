import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Etihadsouq eCommerce Manager",
  description: "Order Manager & more",
};

const roboto = Roboto_Flex();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
