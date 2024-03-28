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
import PostBox from "../feed/components/postBox";

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
    <section className="mx-2 md:mx-12 min-h-max bg-white relative w-full">
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
      <div className=" bg-white p-2 md:p-5  w-full flex justify-between   items-center">
        {user?.profileImg ? (
          <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] relative rounded-full ">
            <Image
              src={user?.profileImg}
              alt="Imagem de perfil"
              className="object-cover rounded-full"
              fill
              sizes="70px,100px"
            />
          </div>
        ) : (
          <IoPersonCircle size={100} />
        )}
        <div className="flex gap-2 md:gap-5 flex-col sm:flex-row ">
          <h2>Seguindo: {user?.following.length}</h2>
          <h2>Seguidores: {user?.followedBy.length}</h2>
        </div>
      </div>
      <div className="md:m-5 flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-1 md:items-center flex-row">
            <div className="flex flex-col ">
              <h1 className="text-md md:text-2xl font-bold w-fit text-wrap">
                {user?.displayName}
              </h1>
              <h2 className="text-lightGray text-sm md:text-lg w-fit">
                @{user?.username}
              </h2>
            </div>
            <Link
              href={"/profile/edit"}
              className="border border-black rounded-lg h-fit flex p-2 gap-1 md:gap-3 items-center hover:scale-105 duration-300 w-1/2"
            >
              <span className="text-nowrap sm:text-nowrap text-sm md:text-md">
                Editar perfil
              </span>
              <RiPencilFill size={20} className="cursor-pointer" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col mt-10">
          <h1 className="text-xl font-bold w-fit">Bio</h1>
          <p className="text-lightGray w-full ">
            {user?.bio ? user?.bio : "Esse usuário ainda não possui uma bio."}
          </p>
        </div>
      </div>
      <div className="md:mx-5 border border-gray-200 rounded-lg">
        <PostBox />
      </div>
      <div>
        <Suspense fallback={<LoadingComponents />}>
          <GetPosts />
        </Suspense>
      </div>
    </section>
  );
};

export default Profile;
