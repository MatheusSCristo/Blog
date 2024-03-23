import revalidateAllData from '@/utils/revalidateData';
import { useRouter } from 'next/navigation';
import React from 'react'


type DeletePostModalParamsType={
    postId:String;
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
}


const DeletePostModal = ({setIsOpen,postId}:DeletePostModalParamsType) => {
    const router=useRouter()

    const handleDeletePost = async () => {
          await fetch("/api/deletePost", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ postId }),
          });
        setIsOpen(false);
        router.refresh()
        }

  return (
    <div className='fixed top-1/2 right-1/2 translate-x-1/2 flex items-center justify-center z-[30]'>
        <div className='bg-white w-[500px] h-[200px] rounded-2xl shadow-[0px_5px_15px_rgba(0,0,0,0.3)] flex flex-col items-center relative p-5'>
            <h1 className='text-[24px] font-bold'>Deseja realmente apagar esse post?</h1>
            <h2 className='text-[20px] mt-2'>Essa ação é irreversível!</h2>
            <div className='bottom-2 absolute flex gap-3'>
                <button className='p-4 bg-emerald-500 w-[150px] rounded-md hover:scale-105 hover:text-white' onClick={handleDeletePost}>Apagar</button>
                <button className='p-4 bg-red-500 w-[150px] rounded-md hover:scale-105 hover:text-white' onClick={()=>setIsOpen(false)}>Cancelar</button>
                
            </div>
        </div>

    </div>
  )
}

export default DeletePostModal