import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{ children }</>;
}
