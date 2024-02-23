'use client'
import React, { useEffect, useState } from 'react'
import { FaRegBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { ImBlogger } from "react-icons/im";
import prisma from '@/lib/prisma';
import { UserSearchType } from '@/types/types';





const navBar =  () => {
    const [users,setUsers] = useState<null | UserSearchType[]>()
    const [search, setSearch] = useState<string | undefined>(undefined)
    const getUsers = async () => {
        const data = await fetch('/api/getUsers')
        const res=await data.json()
        setUsers(res.data)
    }
    useEffect(()=>{
        getUsers()
    },[])

    return (
        <nav className='flex items-center justify-evenly p-4 bg-white'>
            <div className='flex items-center gap-3'>
                <ImBlogger size={30} />
                <h1>BLOG</h1>
            </div>
            <div className='relative flex items-center w-2/5'>
                <input type='text' placeholder='Procurar' className='border border-lightGray rounded-xl w-full p-2' value={search} onChange={(e) => setSearch(e.target.value)} />
                <CiSearch size={30} className='absolute right-0 mx-2 p-1 rounded-[50%] bg-lightBlue text-white' />
            </div>

            {search && 
            <div className='bg-white border border-lightGray roundexl h-fit'>
                 {users?.map((user:UserSearchType) => {
                return (
                    <div className=''>
                        
                        <h1>{user.displayName}</h1>


                    </div>
                )
            })}
            </div>
            }
            <div className='rounded-[50%] p-1 border border-black flex '>
                <FaRegBell size={30} />
            </div>
        </nav>
    )
}

export default navBar