import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoPerson } from "react-icons/io5";

const getFollowing = async () => {
  const session: any = await getServerSession(authOptions);
  if (session?.user.id) {
    const data = await prisma.follows.findMany({
      where: {
        followedById: session?.user.id,
      },
      include: {
        following: true,
      },
    });
    return data;
  }
};

const Following = async () => {
  const followers = await getFollowing();

  return (
    <div className="bg-white border rounded-lg flex-col p-5 flex gap-2" >
      <div className="flex gap-2">
        <h1 className="font-bold">Estou Seguindo</h1>
        <span className="text-lightGray">{followers?.length}</span>
      </div>
      {followers?.map((follower) => (
        
        <Link href={`/profile/{follower.followingId}`} key={follower.followingId} className=" cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-black text-white">
          {follower.following.profileImg ? (
            <Image
              src={follower.following.profileImg}
              alt={`Imagem de perfil de ${follower.following.username} `}
              fill
              objectFit="contain"
            />
          ) : (
            <IoPerson size={30} />
          )}
        </Link >
      ))}
    </div>
  );
};

export default Following;
