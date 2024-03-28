import { Poppins } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sessionsType } from "@/types/types";
import Provider from "@/app/context/Provider";
import MenuBar from "./components/menuBar";
import NavBar from "./components/navBar";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const getUser = async () => {
  const session: sessionsType | null = await getServerSession(authOptions);
  if (session?.user?.id) {
    const data = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        displayName: true,
        profileImg: true,
      },
    });
    return data;
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <Provider>
      <NavBar />
      <main className="bg-bgGray px-[2vw] sm:px-[5vw] py-4 flex ">
        <MenuBar user={user} />
        {children}
      </main>
    </Provider>
  );
}
