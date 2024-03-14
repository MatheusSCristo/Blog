"use client";
import { UserContext } from "@/app/context/userSession";
import { profileUserType } from "@/types/types";
import getUserInfo from "@/utils/getUserInformation";
import revalidateAllData from "@/utils/revalidateData";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { RiPencilFill } from "react-icons/ri";

type values = {
  username: string | undefined;
  bio?: string | undefined;
  displayName?: string | undefined;
};
const initialState: values = {
  username: "",
  bio: "",
  displayName: "",
};

const EditProfile = () => {
  const [values, setValues] = useState<values>(initialState);
  const [message, setMessage] = useState({ error: false, message: "" });
  const [userInfos, setUserInfos] = useState<profileUserType>(
    {} as profileUserType
  );
  const { currentUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const getUserInfos = async () => {
      const res = await getUserInfo(currentUser.id);
      setUserInfos(res.data);
    };
    getUserInfos();
  }, [currentUser]);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevState: values) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values) {
      setMessage({
        error: true,
        message: "É preciso informar algum campo a ser alterado",
      });
      return;
    }

    await fetch("/api/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser.id,
        ...values,
      }),
    }).then((res) => {
      if (!res.ok) {
        if (res.status == 409) {
          setMessage({
            error: true,
            message:
              "O nome de usuário já está em uso, escolha outro e tente novamente.",
          });
        } else {
          setMessage({
            error: true,
            message:
              "Ocorreu um erro ao atualizar as informações, tente novamente mais tarde.",
          });
        }
      } else {
        setMessage({
          error: false,
          message: "Informações alteradas com sucesso!",
        });
        revalidateAllData();
        setTimeout(() => router.push("/profile"), 1500);
      }
    });
  };

  return (
    <section className="w-full mx-16 min-h-max bg-white relative">
      <div className="h-1/5  w-full relative">
        {userInfos.bgImg ? (
          <Image
            src={userInfos.bgImg}
            fill={true}
            alt="Imagem de fundo do usuário"
          />
        ) : (
          <div className="h-full w-full bg-slate-500" />
        )}
        <div className="bg-white absolute z-10 right-0 m-5 p-2 flex items-center gap-2 rounded-lg cursor-pointer">
          <button className="bg-lightBlue rounded text-white hover:scale-105 p-2">
            Editar foto de fundo    
          </button>
        </div>
      </div>
      <div className="  p-0 absolute z-10 top-32 left-10 flex items-center justify-center rounded">
        {userInfos?.profileImg ? (
          <Image
            src={userInfos.profileImg}
            alt="Imagem de perfil"
            width={150}
            height={150}
          />
        ) : (
          <IoPersonCircle size={100} />
        )}
        <button className="bg-lightBlue rounded text-white hover:scale-105 p-2">
          Editar foto de perfil
        </button>
      </div>
      <div className="my-16 p-10">
        <form
          className="grid grid-cols-2 gap-5 grid-rows-3"
          onSubmit={updateUserInfo}
        >
          <div className="flex flex-col w-4/5">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="p-3 bg-gray-100 border border-slay-500 rounded "
              onChange={handleChanges}
              placeholder={userInfos?.username}
            />
          </div>
          <div className="flex flex-col w-4/5">
            <label htmlFor="displayName">Display Name </label>
            <input
              type="text"
              name="displayName"
              className="p-3 bg-gray-100 border border-slay-500 rounded "
              onChange={handleChanges}
              placeholder={userInfos.displayName}
            />
          </div>
          <div className="flex flex-col w-4/5">
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              name="bio"
              className="p-3 bg-gray-100 border border-slay-500 rounded "
              onChange={handleChanges}
              placeholder={userInfos.bio}
            />
          </div>
          <div className="flex row-start-3 gap-2 mx-5 flex-col">
            <div className="flex gap-5">
              <button
                type="submit"
                className="bg-lightBlue p-2 rounded-lg text-white"
              >
                Salvar mudanças
              </button>
              <Link
                href={"/profile"}
                className="bg-white p-2 border border-lightBlue text-lightBlue rounded-lg"
              >
                Cancelar
              </Link>
            </div>
            {message.message && (
              <span
                className={`text-md ${
                  message.error ? "text-red" : "text-emerald-400"
                }`}
              >
                {message.message}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
