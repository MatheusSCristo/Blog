"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  IoPersonOutline,
  IoHomeOutline,
  IoPersonCircle,
} from "react-icons/io5";
import { AiOutlinePoweroff, AiOutlineMessage } from "react-icons/ai";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

type User = {
  user:
    | {
        displayName: string | null | undefined;
        profileImg: string | null | undefined;
      }
    | undefined
    | null;
};

const pages = [
  { page: "feed", name: "Início", icon: IoHomeOutline },
  { page: "messages", name: "Mensagens", icon: AiOutlineMessage },
  { page: "profile", name: "Perfil", icon: IoPersonOutline },
];

export const revalidate = 0;
const MenuBar = ({ user }: User) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleOnClickSignOut = async () => {
    await signOut();
    Cookie.remove("auth-token");
    router.refresh();
  };

  return !menuOpen ? (
    <div className="h-full bg-darkBlue w-16 md:w-32 rounded-xl flex flex-col items-center py-8 relative sticky top-0">
      <div className=" w-full relative flex items-center justify-center ">
        {user?.profileImg ? (
          <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-full relative ">
            <Image
              src={user.profileImg}
              alt="Imagem de perfil"
              fill
              className="object-cover rounded-full"
            />
          </div>
        ) : (
          <IoPersonCircle size={70} className="rounded-[50%] text-white" />
        )}
        <IoIosArrowDropright
          size={30}
          className="absolute right-0 text-white hover:scale-110 hidden sm:block"
          onClick={() => setMenuOpen(true)}
        />
      </div>
      <div className="flex flex-col gap-4 md:gap-10 my-10">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.name}
              href={`/${page.page}`}
              className={`p-2 md:p-3 rounded-xl hover:scale-105 hover:border hover:border-white cursor-pointer ${
                pathname === `/${page.page}` ? "border border-white" : ""
              }`}
            >
              <Icon className="text-white" size={30} />
            </Link>
          );
        })}
      </div>
      <div
        className=" my-5 hover:border hover:border-white p-3 rounded-xl hover:scale-110 cursor-pointer"
        onClick={handleOnClickSignOut}
      >
        <AiOutlinePoweroff size={30} className="text-white" />
      </div>
    </div>
  ) : (
    <div className="hidden sm:flex h-fit bg-white w-[300px] w-1/5 rounded-2xl  flex-col items-center py-8 relative">
      <div className=" w-full flex flex-col items-center justify-center">
        <div className="relative flex  items-center justify-center w-full">
          {user?.profileImg ? (
            <div className="w-[70px] h-[70px] rounded-full relative ">
              <Image
                src={user.profileImg}
                alt="Imagem de perfil"
                fill
                className="object-cover rounded-full"
              />
            </div>
          ) : (
            <IoPersonCircle size={70} className="text-black" />
          )}
          <IoIosArrowDropleft
            size={30}
            className="absolute right-0 text-black hover:scale-110"
            onClick={() => setMenuOpen(false)}
          />
        </div>
        <h1 className="my-2">{user?.displayName}</h1>
      </div>
      <div className="flex flex-col gap-4 md:gap-8 my-10 w-full items-center text-sm md:text-lg ">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.page}
              href={`/${page.page}`}
              className={`${
                pathname === "/messages" ? "border bg-darkBlue text-white" : ""
              } p-3 rounded-xl hover:scale-105 hover:border w-full md:w-4/5 text-black hover:bg-darkBlue hover:text-white ease-in duration-200 cursor-pointer flex items-center gap-2 text-black`}
            >
              <Icon size={30} />
              <span>{page.name}</span>
            </Link>
          );
        })}
      </div>
      <div
        className="flex  items-center gap-2 bottom-0 my-5  hover:border hover:bg-darkBlue hover:text-white p-3 rounded-xl hover:scale-110 cursor-pointer "
        onClick={handleOnClickSignOut}
      >
        <AiOutlinePoweroff size={30} />
        <span>Logoff</span>
      </div>
    </div>
  );
};

export default MenuBar;
