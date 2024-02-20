import NavBar from "@/app/(pages)/(navigation)/components/navBar";
import MenuBar from "@/app/(pages)/(navigation)/components/menuBar";


export default function ({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
      <NavBar />
      <main className='bg-bgGray px-32 py-4 flex'>
        <MenuBar />
        {children}
      </main>
    </>

  );
}
