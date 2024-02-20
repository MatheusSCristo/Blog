'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { createUserFormSchema } from '@/schemas/createUserSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Register = () => {
    const [passVisibility, setPassVisibility] = useState(false)
    const [erros, setErrors] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    type createUserType = z.infer<typeof createUserFormSchema>



    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm<createUserType>({
        resolver: zodResolver(createUserFormSchema)
    })

    const handleOnClickVisibilityButton = () => {
        setPassVisibility(!passVisibility)
    }


    const handleOnClickSubmit = async (data: createUserType) => {
        setLoading(true)
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        );

        if (res.ok) {
            router.push('/')
        }
        const response = await res.json()
        setErrors(response?.message)
        setLoading(false)
    }




    return (
        <main className=' flex justify-center items-center min-h-[100vh] m-0 relative '>
            <Image src={'/bgRegister.jpg'} fill={true} objectFit='' alt='bg-IMG' priority={true} />

            <div className='flex flex-col p-5 items-center bg-white z-10 md:w-2/5 rounded-2xl gap-2'>
                <h1 className='ttext-2xl md:text-4xl font-bold my-1 md:my-4'>Crie sua conta</h1>
                <h2 className="text-md md:text-xl">Entre com</h2>
                <div className='flex justify-between md:w-2/5 gap-3'>
                    <div className='bg-white flex items-center justify-center border border-lightGray rounded p-2 gap-2 w-32'>
                        <FcGoogle size={20} />
                        <Link href={''}>Google</Link>
                    </div>
                    <div className='bg-white flex items-center justify-center border border-lightGray rounded p-2 gap-2 w-32'>
                        <FaGithub size={20} />
                        <Link href={''}>GitHub</Link>
                    </div>
                </div>
                <div className='flex flex-row w-full items-center gap-2 md:gap-3 md:px-2 '>
                    <span className='bg-lightGray grow h-[1px] w-full ' />
                    <h3 className='w-1/2 text-center text-nowrap my-2 text-sm md:"text-md'>Ou continue com</h3>
                    <span className='bg-lightGray w-full h-[1px]' />
                </div>

                <form className='flex flex-col md:w-3/5 text-lightGray ' onSubmit={handleSubmit(handleOnClickSubmit)}>
                    <label htmlFor='username' className='my-2'>Username</label>
                    <input type='text' className='p-5 bg-white border border-lightGray rounded-2xl w-full shadow-md'  {...register('username')} />
                    {errors.username && <span className='text-red'>{errors.username.message}</span>}
                    <label className='my-2' htmlFor='email'>Email</label>
                    <input type='text' className='p-5 bg-white border border-lightGray rounded-2xl w-full shadow-md'  {...register('email')} />
                    {errors.email && <span className='text-red'>{errors.email.message}</span>}
                    <label className='my-2' htmlFor='password'>Senha</label>
                    <div className='relative w-full flex items-center'>
                        <input type={passVisibility ? 'text' : "password"} className='p-5 bg-white border border-lightGray rounded-2xl w-full shadow-md'
                            {...register('password')} />
                        {passVisibility ? <FaRegEyeSlash size={20} className='absolute right-5' onClick={handleOnClickVisibilityButton} />
                            : <FaRegEye size={20} className='absolute right-5' onClick={handleOnClickVisibilityButton} />}
                    </div>
                    {errors.password && <span className='text-red'>{errors.password.message}</span>}
                    <label className='my-2' htmlFor='checkPass'>Confirme sua senha</label>
                    <input type="password" className='p-5 bg-white border border-lightGray rounded-2xl w-full shadow-md' {...register('checkPass')} />
                    {errors.checkPass && <span className='text-red'>{errors.checkPass.message}</span>}
                    {erros && <span className='text-red text-sm text-center mt-2'>{erros}</span>}

                    <button type='submit' className='bg-lightBlue w-1/2  rounded-2xl text-white uppercase m-auto my-5 p-3 font-semibold disabled:opacity-50' disabled={loading}>Criar conta</button>
                </form>
                <h2>Já possui uma conta?<Link href={'/login'} className='mx-2 text-lightBlue'>Faça login</Link></h2>
            </div>





        </main>
    )
}

export default Register