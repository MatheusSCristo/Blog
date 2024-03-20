import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sessionsType } from "@/types/types";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { RiPencilFill } from "react-icons/ri";
import { IoPersonCircle } from "react-icons/io5";
import LoadingComponents from "../components/loadingComponents";
import GetPosts from "./components/getPosts";

const getUser = async () => {
  const session: sessionsType | null = await getServerSession(authOptions);
  if (session?.user?.id) {
    const data = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        bio: true,
        displayName: true,
        username: true,
        followedBy: true,
        following: true,
        profileImg: true,
        bgImg: true,
      },
    });
    return data;
  }
};

const Profile = async () => {
  const user = await getUser();
  return (
    <section className="w-full mx-16 min-h-max bg-white relative">
      <div className="h-[200px] w-full relative">
        {user?.bgImg ? (
          <Image
            src={user?.bgImg}
            fill={true}
            alt="Imagem de fundo"
            className="z-0"
          />
        ) : (
          <div className="h-full w-full bg-slate-500 " />
        )}
      </div>
      <div className=" bg-white m-10 p-1 border-[1px] border-black w-fit rounded">
        {user?.profileImg ? (
          <div className="w-[100px] h-[100px] relative ">
            <Image
              src={user?.profileImg}
              alt="Imagem de perfil"
              className="object-cover rounded-full"
              fill
            />
          </div>
        ) : (
          <IoPersonCircle size={100} />
        )}
      </div>
      <div className="m-10 flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-10 items-center ">
            <h1 className="text-2xl font-bold ">{user?.displayName}</h1>
            <h3 className="text-lightGray">@{user?.username}</h3>
            <Link
              href={"/profile/edit"}
              className="border border-black rounded-lg flex p-2 gap-3 items-center hover:bg-lightBlue duration-300"
            >
              <span>Editar perfil</span>
              <RiPencilFill size={20} className="cursor-pointer" />
            </Link>
          </div>
          <div className="flex gap-5">
            <h2>Seguindo: {user?.following.length}</h2>
            <h2>Seguidores: {user?.followedBy.length}</h2>
          </div>
        </div>
        <div className="flex flex-col mt-10">
          <h1 className="text-xl font-bold">Bio</h1>
          <p className="text-lightGray">{user?.bio}</p>
        </div>
      </div>
      <Suspense fallback={<LoadingComponents />}>
        <GetPosts />
      </Suspense>
    </section>
  );
};

export default Profile;
