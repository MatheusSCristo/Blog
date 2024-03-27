"use client";
import Image from "next/image";
import Link from "next/link";
import React, {  useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginUserFormSchema } from "@/schemas/loginUserSchema";
import {  signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [passVisibility, setPassVisibility] = useState(false);
  const [erros, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  type loginUserType = z.infer<typeof LoginUserFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserType>({
    resolver: zodResolver(LoginUserFormSchema),
  });

  const handleOnClickVisibilityButton = () => {
    setPassVisibility(!passVisibility);
  };

  const handleOnClickSubmit = async (data: loginUserType) => {
    setLoading(true);
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if(signInData?.ok){
      router.push('/feed')
    }
    if (signInData?.status === 401) {
      setErrors("Erro na validação das credenciais,tente novamente");
    }

  };

  return (
    <main className="flex justify-center items-center h-[100vh] m-0 relative bg-bgGray ">
      <div className="flex flex-col p-5 items-center bg-white z-10 md:w-2/5 rounded-2xl gap-2">
        <h1 className="text-2xl md:text-4xl font-bold my-1 md:my-4">
          Bem vindo de volta
        </h1>
        <h2 className="text-md md:text-xl">Entre com</h2>
        <div className="flex justify-between md:w-2/5 gap-3">
          <div className="bg-white flex items-center justify-center border border-lightGray rounded p-2 gap-2 md:w-32 cursor-pointer">
            <FcGoogle size={20} />
            <span onClick={() => ""}>Google</span>
          </div>
          <div className="bg-white flex items-center justify-center border border-lightGray rounded p-2 gap-2 md:w-32 cursor-pointer">
            <FaGithub size={20} />
            <span onClick={() => ""}>GitHub</span>
          </div>
        </div>
        <div className="flex flex-row w-full items-center gap-2 md:gap-3 md:px-2 ">
          <span className="bg-lightGray grow h-[1px] w-full " />
          <h3 className="w-1/2 text-center text-nowrap my-2 text-sm md:text-md">
            Ou continue com
          </h3>
          <span className="bg-lightGray w-full h-[1px]" />
        </div>

        <form
          className="flex flex-col md:w-3/5 text-lightGray "
          onSubmit={handleSubmit(handleOnClickSubmit)}
        >
          <label className="my-2" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="p-5 bg-white border border-lightGray rounded-2xl w-full shadow-md"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <label className="my-2" htmlFor="password">
            Senha
          </label>
          <div className="relative w-full flex items-center">
            <input
              type={passVisibility ? "text" : "password"}
              className="p-5 bg-white border border-lightGray rounded-2xl w-full shadow-md"
              {...register("password")}
            />
            {passVisibility ? (
              <FaRegEyeSlash
                size={20}
                className="absolute right-5"
                onClick={handleOnClickVisibilityButton}
              />
            ) : (
              <FaRegEye
                size={20}
                className="absolute right-5"
                onClick={handleOnClickVisibilityButton}
              />
            )}
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          {erros && (
            <span className="text-red-500 text-sm text-center mt-2">{erros}</span>
          )}
          <button
            type="submit"
            className="bg-darkBlue w-1/2  rounded-2xl text-white uppercase m-auto my-5 p-3 font-semibold disabled:opacity-50"
            disabled={loading}
          >
            Entrar
          </button>
        </form>
        <h2>
          Não possui uma conta?
          <Link
            href={"/auth/register"}
            className="text-nowrap md:mx-2 text-darkBlue"
          >
            Se cadastre agora
          </Link>
        </h2>
      </div>
    </main>
  );
};

export default Login;
