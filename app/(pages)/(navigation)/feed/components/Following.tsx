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
    <div className="bg-white border rounded-lg flex-col p-5 flex gap-2 h-full">
      <div className="flex gap-2">
        <h1 className="font-bold">Estou Seguindo</h1>
        <span className="text-lightGray">{followers?.length}</span>
      </div>
      <div className="grid grid-cols-6 w-full gap-2">
        {followers?.map(
          (follower, index) =>
            index < 30 && (
              <Link
                href={`/profile/${follower.followingId}`}
                key={follower.followingId}
              >
                {follower.following.profileImg ? (
                  <div className="relative w-[50px] h-[50px] ">
                    <Image
                      src={follower.following.profileImg}
                      alt={`Imagem de perfil de ${follower.following.username} `}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <div className="bg-darkBlue w-[50px] h-[50px] rounded-full flex items-center justify-center">
                    <IoPerson size={40} className="text-white " />
                  </div>
                )}
              </Link>
            )
        )}

        <div className="bg-darkBlue w-[50px] h-[50px] rounded-full flex items-center justify-center">
          <span className="text-white">...</span>
        </div>
      </div>
    </div>
  );
};

export default Following;
