"use client";
import { Comment } from "@/types/types";
import getPostedTime from "@/utils/getPostedTime";
import revalidatePostsData from "@/utils/revalidatePosts";
import { CircularProgress } from "@mui/material";
import { getSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";

const CommentModal = ({
  comments,
  postId,
}: {
  comments: Comment[];
  postId: string;
}) => {
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState<null | string>();
  const [isLoading, setIsLoading] = useState(false);

  const getAuthorId = async () => {
    const session: any = await getSession();
    setAuthorId(session.user.id);
  };

  useEffect(() => {
    getAuthorId();
  }, []);

  const handleSendComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContent("");
    setIsLoading(true);
    await fetch("/api/createComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, postId, authorId }),
    });
    revalidatePostsData();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-fit w-full bg-[#000} ">
      <div className="bg-white flex w-full flex-col p-2 md:p-5 ">
        <form onSubmit={handleSendComment} className="flex gap-2 md:gap-10 flex-col md:flex-row">
          <input
            type="text"
            className="w-full border border-gray-400 rounded-xl h-[50px] md:p-5 p-1 text-sm"
            placeholder="Deixe um comentário"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="bg-darkBlue rounded-xl text-white p-2 w-fit self-end"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
      {isLoading && (
        <div className="p-5">
          <CircularProgress size={20} />
        </div>
      )}
      {comments.map((comment) => (
        <div
          className="flex flex-col w-full p-1 md:p-5 border-b"
          key={comment.id}
        >
          <div className="ml-[5%] flex gap-1 md:gap-5 items-center">
            {comment.author.profileImg ? (
              <div className="relative w-[35px] h-[35px]">
                <Image
                  src={comment.author.profileImg}
                  alt="Imagem de perfil"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            ) : (
              <IoPersonCircle size={30} />
            )}
            <div className="flex-col md:flex-row flex">
              <h1 className="font-bold text-md w-max">
                {comment.author.displayName}
              </h1>
              <span className="text-sm text-lightGray">
                {getPostedTime(comment.createdAt)}
              </span>
            </div>
          </div>
          <p className="ml-[10%] py-2">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentModal;
