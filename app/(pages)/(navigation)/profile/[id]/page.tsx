import Image from "next/image";
import React from "react";
import {  Post } from "@/types/types";
import { IoPersonCircle } from "react-icons/io5";
import PostsCard from "../../feed/components/postsCard";
import { notFound, redirect } from "next/navigation";
import FollowButton from "./components/followButton";
import prisma from "@/lib/prisma";
import { prismaExclude } from "@/utils/excludePass";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      email: true,
      bgImg: true,
      username: true,
      bio: true,
      createdAt: true,
      displayName: true,
      followedBy: true,
      following: true,
      profileImg: true,
      posts: {
        include: {
          category: true,
          comments: {
            include: {
              author: {
                select: prismaExclude("User", ["password"]),
              },
            },
          },
          likes: true,
          author: true,
        },
      },
    },
  });
  if(!user){
    notFound()
  }
  return user;
};

const LayoutPage = async ({ params }: { params: { id: string } }) => {
  const user = await getUser(params.id);
  const session:any=await getServerSession(authOptions);
  if(params.id ===session?.user.id){
    redirect('/profile')
  }
  return (
    <section className="w-full mx-16 min-h-max bg-white relative">
      <div className="h-[200px]  w-full relative">
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
      <div className="flex justify-between w-full items-center p-5">
        <div className=" bg-white p-5 w-[100px] h-[100px] rounded relative">
          {user?.profileImg ? (

            <Image
              src={user.profileImg}
              fill
              className="object-fit rounded-full"
              alt="Foto de perfil"
            />
          ) : (
            <IoPersonCircle size={100} />
          )}
        </div>

        <FollowButton params={params} user={user} />
      </div>
      <div className="m-5 flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-10 items-center ">
            <h1 className="text-2xl font-bold ">{user?.displayName}</h1>
            <h3 className="text-lightGray">@{user?.username}</h3>
          </div>
        </div>
        <div className="flex flex-col mt-10">
          <h1 className="text-xl font-bold">Bio</h1>
          <p className="text-lightGray">{user?.bio}</p>
        </div>
      </div>
      {user?.posts && user?.posts?.length > 0 ? (
        user?.posts
          ?.reverse()
          .map((post: Post) => (
            <PostsCard post={post} key={post.id} isAuthor={false} />
          ))
      ) : (
        <div className="flex justify-center w-full mt-10">
          <h1 className="font-bold text-2xl">
            O usuário ainda não possui nenhum post publico!
          </h1>
        </div>
      )}
    </section>
  );
};

export default LayoutPage;
