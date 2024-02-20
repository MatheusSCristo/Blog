import React from 'react'
import { FaRegBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { ImBlogger } from "react-icons/im";

const navBar = () => {

    return (
        <nav className='flex items-center justify-evenly p-4 bg-white'>
            <div className='flex items-center gap-3'>
                <ImBlogger size={30} />
                <h1>BLOG</h1>
            </div>
            <div className='relative flex items-center w-2/5'>
                <input type='text' placeholder='Procurar' className='border border-lightGray rounded-xl w-full p-2' />
                <CiSearch size={30} className='absolute right-0 mx-2 p-1 rounded-[50%] bg-lightBlue text-white' />
            </div>
            <div className='rounded-[50%] p-1 border border-black flex '>
                <FaRegBell size={30} />
            </div>
        </nav>
    )
}

export default navBar