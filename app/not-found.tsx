import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div className='h-screen items-center justify-center flex flex-col'>
            <h1 className='text-3xl font-bold'>A página buscada não existe</h1>
            <Image src={'/notFound.jpg'} alt='Imagem de página não encontrada' width={500} height={500} />
            <Link href={'/home'} className='p-5 bg-lightBlue text-white rounded-2xl '>
                <button>Retornar a página principal</button>
            </Link>
        </div>
    )
}

export default NotFound