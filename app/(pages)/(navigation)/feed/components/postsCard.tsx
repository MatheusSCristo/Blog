"use client";
import revalidateAllData from "@/utils/revalidateData";
import React, { useContext, useEffect, useState } from "react";
import { CiChat1 } from "react-icons/ci";
import { IoHeartCircle, IoPerson, IoTrashBinOutline } from "react-icons/io5";
import CommentModal from "./commentModal";
import { Post } from "@/types/types";
import getPostedTime from "@/utils/getPostedTime";
import Image from "next/image";
import DeletePostModal from "@/app/modal/DeletePost";
import { UserContext } from "@/app/context/userSession";
import Link from "next/link";

const PostsCard = ({ post, isAuthor }: { post: Post; isAuthor: boolean }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [commentIsOpen, setCommentIsOpen] = useState(false);
  const [deleteModelIsOpen, setDeleteModelIsOpen] = useState(false);
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    post.likes.map((e: { userId: string; postId: string }) => {
      if (e.userId === currentUser?.id) {
        setLiked(true);
      }
    });
  }, [post.likes, currentUser?.id]);

  const handleOnClickLikeButton = async (postId: string | undefined) => {
    if (liked) {
      setLikes((prevState: number) => prevState - 1);
    } else {
      setLikes((prevState: number) => prevState + 1);
    }
    setLiked((prevState) => !prevState);
    await fetch("/api/likePost", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, userId: currentUser?.id }),
    }).then(() => {
      revalidateAllData();
    });
  };

  return (
    <>
      {deleteModelIsOpen && (
        <DeletePostModal postId={post.id} setIsOpen={setDeleteModelIsOpen} />
      )}
      <div className="bg-white mt-8 min-h-[200px] rounded-lg border border-black m-10">
        <div className="flex p-5 items-center mx-5 justify-between">
          <div className="flex gap-5 items-center">
            {post.author.profileImg ? (
              <div className="relative w-[50px] h-[50px]">
                <Link href={`profile/${post.authorId}`}>
                  <Image
                    src={post.author.profileImg}
                    alt={`Imagem de perfil de ${post.author.username} `}
                    fill
                    className="object-cover rounded-full"
                  />
                </Link>
              </div>
            ) : (
              <IoPerson size={30} />
            )}
            <h1 className="text-xl font-bold">{post.author?.displayName}</h1>
            <h2 className="text-lg text-lightGray">@{post.author?.username}</h2>
            <span>- Postado {getPostedTime(post?.createAt)} </span>
          </div>
          {isAuthor && (
            <IoTrashBinOutline
              size={30}
              className="cursor-pointer hover:scale-105 cursor-pointer"
              onClick={() => setDeleteModelIsOpen(true)}
            />
          )}
        </div>
        <div className="flex flex-col p-5 mx-5 gap-2">
          <h1 className="text-2xl font-bold">{post?.title}</h1>
          <p className="ml-4"> {post?.content}</p>
        </div>
        <div className="flex gap-10 mx-5 p-5 text-lightGray items-center">
          <div
            className="flex gap-2 items-center text-lightGray "
            onClick={() => handleOnClickLikeButton(post?.id)}
          >
            <IoHeartCircle
              size={30}
              className={`hover:scale-[1.15] hover:text-red ${
                liked ? "text-red-500" : "text-lightGray"
              }`}
            />
            <span>{likes}</span>
          </div>
          <div className="flex gap-2 items-center text-lightGray">
            <CiChat1
              size={30}
              className="hover:scale-[1.15]"
              onClick={() => setCommentIsOpen((prevState) => !prevState)}
            />
            <span>{post?.comments.length}</span>
          </div>
          <div className="flex gap-2 px-5 py-2 relative h-fit flex-wrap w-full items-center">
            <span className="text-black">Categorias:</span>
            {post.category?.length > 0 ? (
              post.category.map((item) => (
                <div
                  className="basis-[150px] min-w-fit bg-gray-100 flex justify-evenly items-center text-lightGray rounded-lg p-2 gap-2 "
                  key={item.id}
                >
                  <span>{item.category}</span>
                </div>
              ))
            ) : (
              <span className="text-sm ">
                Esse post não possui nenhuma categoria cadastrada...
              </span>
            )}
          </div>
        </div>
        {commentIsOpen && (
          <CommentModal
            comments={post?.comments.sort(
              (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
            )}
            postId={post.id}
          />
        )}
      </div>
    </>
  );
};

export default PostsCard;
