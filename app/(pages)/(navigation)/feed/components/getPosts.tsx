import prisma from "@/lib/prisma";
import React from "react";
import PostsCard from "./postsCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const getPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      likes: true,
      category: true,
      comments: {
        include: {
          author: {
            select: {
              displayName: true,
              username: true,
              profileImg: true,
            },
          },
        },
      },
    },
  });
  return posts.reverse();
};
export const revalidate = 1;

const GetPosts = async ({ isAuthor }: { isAuthor: boolean }) => {
  const session: any = await getServerSession(authOptions);
  const posts = await getPosts();
  return (
    <div className="flex flex-col col-start-1 col-end-3 my-5">
      {posts.length > 0 && session ? (
        posts?.map((post: any) => (
          <PostsCard
            post={post}
            key={post.id}
            isAuthor={isAuthor}
          />
        ))
      ) : (
        <div className="m-10">
          <h1 className="text-center text-xl m-5">
            Não foi possível encontrar nenhum post recente!
          </h1>
        </div>
      )}
    </div>
  );
};

export default GetPosts;
