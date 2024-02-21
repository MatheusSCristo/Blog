import Image from 'next/image'
import React from 'react'
import { RiPencilFill } from "react-icons/ri";
const profile = () => {
    return (
        <section className='w-full mx-16 min-h-max bg-white relative'>
            <div className='h-1/5  w-full relative'>
                <Image src='/bgProfile.png' fill={true} alt='Imagem de fundo' />
                <div className='bg-white absolute z-10 right-0 m-5 p-2 flex items-center gap-2 rounded-lg cursor-pointer'>
                    <RiPencilFill size={20} className='' />
                </div>
            </div>
            <div className=' bg-white p-0 absolute z-10 top-32 left-10 flex items-center justify-center rounded'>
                <Image src='/ImgBigProfile.png' width={120} height={120} alt='Foto de perfil' />
                <RiPencilFill className=' z-10 text-white absolute cursor-pointer' size={30} />
            </div>
            <div className='my-16 p-10'>
                <form className='grid grid-cols-2 gap-5 grid-rows-3'>
                    <div className='flex flex-col w-4/5'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' className='p-3 bg-gray-100 border border-slay-500 rounded ' />
                    </div>
                    <div className='flex flex-col w-4/5'>
                        <label htmlFor='displayName'>Display Name </label>
                        <input type='text' name='displayName ' className='p-3 bg-gray-100 border border-slay-500 rounded ' />
                    </div>
                    <div className='flex flex-col w-4/5'>
                        <label htmlFor='bio'>Bio</label>
                        <input type='text' name='bio' className='p-3 bg-gray-100 border border-slay-500 rounded ' />
                    </div>
                    <div className='flex row-start-3 gap-5'>
                        <button type='submit' className='bg-lightBlue p-2 rounded-lg text-white'>Salvar mudanças</button>
                        <button type={undefined} className='bg-white p-2 border border-lightBlue text-lightBlue rounded-lg'>Cancelar</button>
                    </div>
                </form>

            </div>

        </section>
    )
}

export default profile