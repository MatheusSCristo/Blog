'use client'
import React, { useEffect, useState } from 'react'
import { UserSearchType } from '@/types/types';
import { FaRegBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { ImBlogger } from "react-icons/im";
import { IoPersonCircle } from "react-icons/io5";
import Image from 'next/image';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';

const NavBar = () => {
    const [users, setUsers] = useState<UserSearchType[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const getUsers = async () => {
        setLoading(true)
        const data = await fetch('/api/getUsersSearched', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ search })
        })
        const res = await data.json()
        setUsers(res.data)
        setTimeout(() => {
            setLoading(false)
        }, 1500);

    }
    useEffect(() => {
        if (search) {
            getUsers()
        }
        else {
            setUsers([])
        }
    }, [search])


    return (
        <nav className='flex items-center justify-evenly p-4 bg-white'>
            <div className='flex items-center gap-3'>
                <ImBlogger size={30} />
                <h1>BLOG</h1>
            </div>
            <div className='flex flex-col w-full items-center relative'  >
                <input type='text' placeholder='Procurando um amigo?' className='w-2/5 p-4 rounded-lg border-lightGray border' value={search} onChange={(e) => setSearch(e.target.value)} />
                {users && loading ?
                    <div className='absolute border border-lightGray top-14 bg-white w-2/5 rounded-b-lg flex justify-center z-[11] p-4 '>
                        <CircularProgress />
                    </div>
                    :
                    <ul className='absolute border border-lightGray top-14 bg-white w-2/5 rounded-b-lg z-[11]  '>
                        {users.map((user) => (
                            <Link href={`/profile/${user.id}`} className='flex gap-5 items-center m-2' onClick={() => setSearch('')} key={user.id}>
                                {user.profileImg ?
                                    <Image src={user.profileImg} alt='Imagem de perfil' style={{ borderRadius: '50%' }} width={50} height={50} />
                                    :
                                    <IoPersonCircle size={40} />
                                }
                                <div className='flex flex-col gap-2'>
                                    <h1>{user.displayName}</h1>
                                    <h2 className='text-lightGray'>@{user.username}</h2>
                                </div>
                            </Link>
                        ))}
                    </ul>


                }
            </div>
            <div className='rounded-[50%] p-1 border border-black flex '>
                <FaRegBell size={30} color='black' />
            </div>
        </nav>

    )
}

export default NavBar