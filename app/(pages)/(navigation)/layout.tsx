import NavBar from "@/app/(pages)/(navigation)/components/navBar";
import MenuBar from "@/app/(pages)/(navigation)/components/menuBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

// eslint-disable-next-line react/display-name
export default async function  ({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const session= await getServerSession(authOptions)
    if (!session) {
      redirect('/auth/login') 
    }
  

  return (
    <>
      <NavBar />
      <main className='bg-bgGray px-32 py-4 flex min-h-fit'>
        <MenuBar />
        {children}
      </main>
    </>

  );
}
