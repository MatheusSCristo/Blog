import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NavBar from "./(pages)/(navigation)/components/navBar";
import MenuBar from "./(pages)/(navigation)/components/menuBar";
import "./globals.css";

const poppins = Poppins({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
          {children}
      </body>

    </html>
  );
}
