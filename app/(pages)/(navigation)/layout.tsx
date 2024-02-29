import NavBar from "@/app/(pages)/(navigation)/components/navBar";
import MenuBar from "@/app/(pages)/(navigation)/components/menuBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { sessionsType } from "@/types/types";
import prisma from "@/lib/prisma";

const getUser = async () => {
  const session: sessionsType | null = await getServerSession(authOptions)
  if(!session){
    redirect('/auth/login')
  }
  if (session?.user?.id) {
      const data = await prisma.user.findUnique({
          where: {
              id: session.user.id
          },
          select:{
                displayName:true,
                profileImg:true,
          }
      })
      return data
  }
}
// eslint-disable-next-line react/display-name
export default async function  ({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const user=await getUser()
  return (
    <>
      <NavBar />
      <main className='bg-bgGray px-[3%] py-4 flex flex-1'>
        <MenuBar user={user} />
        {children}
      </main>
    </>

  );
}
