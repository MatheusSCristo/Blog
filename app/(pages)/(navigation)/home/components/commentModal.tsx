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

  const handleSendComment = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
      <div className="bg-white flex w-full flex-col p-5 ">
       
          <form onSubmit={handleSendComment} className="flex gap-10">
            <input
              type="text"
              className="w-full border border-gray-400 w-3/5 rounded-xl h-[50px] p-5"
              placeholder="Deixe um comentário"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              className="bg-lightBlue rounded-xl text-white p-2"
              type="submit"
            >
              Enviar comentário
            </button>
          </form>
       
      </div>
      {isLoading && (
        <div className="p-5">
          <CircularProgress size={20} />
        </div>
      )}
      {comments.map((comment) => (
        <div className="flex flex-col w-full p-5 border-b" key={comment.id}>
          <div className="flex gap-5 items-center">
            {comment.author.profileImg ? (
              <Image
                src={comment.author.profileImg}
                alt="Imagem de perfil"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <IoPersonCircle size={30} />
            )}
            <h1 className="font-bold">{comment.author.displayName}</h1>
            <span className="text-sm text-lightGray">
              {getPostedTime(comment.createdAt)}
            </span>
          </div>
          <p className="ml-12">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentModal;
