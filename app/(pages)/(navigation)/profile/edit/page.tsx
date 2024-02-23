'use client'
import revalidateAllData from '@/utils/revalidateData';
import { getSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { RiPencilFill } from "react-icons/ri";
const profile = () => {
    const [username, setUsername] = useState<string | undefined>(undefined)
    const [bio, setBio] = useState<string | undefined>(undefined)
    const [displayName, setDisplayName] = useState<string | undefined>(undefined)
    const [message, setMessage] = useState({ error: false, message: '' })
    const router = useRouter()


    const updateUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!(username || bio || displayName)) {
            setMessage({ error: true, message: 'É preciso informar algum campo a ser alterado' })
            return
        }
        const session: any = await getSession()
        const { id } = session.user
        await fetch('/api/updateUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    userId: id,
                    username,
                    bio,
                    displayName
                })
        }).then((res) => {
            if (!res.ok) {
                if (res.status == 409) {
                    setMessage({ error: true, message: 'O nome de usuário já está em uso, escolha outro e tente novamente.' })
                }
                else {
                    setMessage({ error: true, message: 'Ocorreu um erro ao atualizar as informações, tente novamente mais tarde.' })
                }
            }
            else {
                setMessage({ error: false, message: 'Informações alteradas com sucesso!' })
                revalidateAllData()
                setTimeout(() => router.push('/profile'), 1500)
            }
        })


    }


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
                <form className='grid grid-cols-2 gap-5 grid-rows-3' onSubmit={updateUserInfo}>
                    <div className='flex flex-col w-4/5'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' name='username' className='p-3 bg-gray-100 border border-slay-500 rounded ' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='flex flex-col w-4/5'>
                        <label htmlFor='displayName'>Display Name </label>
                        <input type='text' name='displayName ' className='p-3 bg-gray-100 border border-slay-500 rounded ' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                    </div>
                    <div className='flex flex-col w-4/5'>
                        <label htmlFor='bio'>Bio</label>
                        <input type='text' name='bio' className='p-3 bg-gray-100 border border-slay-500 rounded ' value={bio} onChange={(e) => setBio(e.target.value)} />
                    </div>
                    <div className='flex row-start-3 gap-2 mx-5 flex-col'>
                        <div className='flex gap-5'>
                            <button type='submit' className='bg-lightBlue p-2 rounded-lg text-white'>Salvar mudanças</button>
                            <Link href={'/profile'} className='bg-white p-2 border border-lightBlue text-lightBlue rounded-lg'>Cancelar</Link>
                        </div>
                        {message.message && <span className={`text-md ${message.error ? "text-red" : "text-emerald-400"}`}>{message.message}</span>}
                    </div>
                </form>

            </div>

        </section>
    )
}

export default profile