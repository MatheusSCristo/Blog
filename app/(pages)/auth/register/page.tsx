"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { createUserFormSchema } from "@/schemas/createUserSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const Register = () => {
  const [passVisibility, setPassVisibility] = useState(false);
  const [erros, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  type createUserType = z.infer<typeof createUserFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserType>({
    resolver: zodResolver(createUserFormSchema),
  });

  const handleOnClickVisibilityButton = () => {
    setPassVisibility(!passVisibility);
  };

  const handleOnClickSubmit = async (data: createUserType) => {
    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/");
    }
    if (!res.ok) {
      const response = await res.json();
      setErrors(response?.message);
    }
    setLoading(false);
  };

  return (
    <main className=" flex justify-center items-center sm:h-screen m-0 relative bg-bgGray ">
      <div className="flex flex-col p-5 items-center bg-white z-10 sm:w-[60vw] xl:w-[40vw] rounded-2xl gap-2">
        <h1 className="text-2xl md:text-4xl font-bold my-1 md:my-4">
          Crie sua conta
        </h1>
        <span className="bg-lightGray w-full h-[1px]" />
        <form
          className="flex flex-col md:w-3/5 text-lightGray "
          onSubmit={handleSubmit(handleOnClickSubmit)}
        >
          <label htmlFor="username" className="my-2">
            Nome
          </label>
          <input
            type="text"
            className="p-2 md:p-5 bg-white border border-lightGray rounded-2xl w-full shadow-md"
            {...register("displayName")}
          />
          {errors.displayName && (
            <span className="text-red-500">{errors.displayName.message}</span>
          )}
          <label htmlFor="username" className="my-2">
            Username
          </label>
          <input
            type="text"
            className="p-2 md:p-5 bg-white border border-lightGray rounded-2xl w-full shadow-md"
            {...register("username")}
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
          <label className="my-2" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            className="p-2 md:p-5 bg-white border border-lightGray rounded-2xl w-full shadow-md"
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
              className="p-2 md:p-5 bg-white border border-lightGray rounded-2xl w-full shadow-md"
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
          <label className="my-2" htmlFor="checkPass">
            Confirme sua senha
          </label>
          <input
            type="password"
            className="p-2 md:p-5 bg-white border border-lightGray rounded-2xl w-full shadow-md"
            {...register("checkPass")}
          />
          {errors.checkPass && (
            <span className="text-red-500">{errors.checkPass.message}</span>
          )}
          {erros && (
            <span className="text-red-500 text-sm text-center mt-2">
              {erros}
            </span>
          )}

          <button
            type="submit"
            className="bg-darkBlue w-3/4 md:w-1/2  rounded-2xl text-white uppercase m-auto my-5 p-3 font-semibold disabled:opacity-50"
            disabled={loading}
          >
            Criar conta
          </button>
        </form>
        <h2 className="text-ligthGray">
          Já possui uma conta?
          <Link href={"/auth/login"} className="mx-2 text-darkBlue">
            Faça login
          </Link>
        </h2>
      </div>
    </main>
  );
};

export default Register;
