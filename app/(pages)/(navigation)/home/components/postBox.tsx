"use client";
import React, { useContext, useEffect, useState } from "react";
import { createPostSchema } from "@/schemas/createPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import revalidatePostsData from "@/utils/revalidatePosts";
import { UserContext } from "@/app/context/userSession";
import getUserInfo from "@/utils/getUserInformation";

const PostBox = () => {
  const { currentUser } = useContext(UserContext);
  const [username, setUsername] = useState();
  useEffect(() => {
    const getUserInfos = async () => {
      const res = await getUserInfo(currentUser.id);
      setUsername(res.data.username);
    };
    if (currentUser?.id) {
      getUserInfos();
    }
  }, [currentUser]);

  type creatPostType = z.infer<typeof createPostSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<creatPostType>({
    defaultValues: { title: "", content: "", category: "" },
    resolver: zodResolver(createPostSchema),
  });

  useEffect(() => {
    setTimeout(() => {
      reset();
    }, 3000);
  }, [isSubmitSuccessful, reset]);

  const handleOnClickPublishButton = (data: creatPostType) => {
    fetch("/api/newPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        authorId: currentUser.id,
      }),
    }).then(() => {
      revalidatePostsData();
    });
  };

  return (
    <form
      className="w-full flex flex-col gap-5 col-start-1 col-end-3 "
      onSubmit={handleSubmit(handleOnClickPublishButton)}
    >
      <div className="bg-white h-[200px] rounded-lg relative">
        <div className="w-full h-[50px] p-5 flex flex-col">
          <input
            className=" text-left rounded-lg"
            placeholder="Titulo"
            {...register("title")}
          />
          {errors.title && (
            <span className="text-red text-sm">{errors.title.message}</span>
          )}
        </div>
        <div className="w-full h-[200px] p-5 flex flex-col">
          <input
            className="  text-left rounded-lg p-2"
            placeholder={
              username && `Compartilhe o que está na sua mente, ${username}... `
            }
            {...register("content")}
          />
          {errors.content && (
            <span className="text-red text-sm">{errors.content.message}</span>
          )}
        </div>
        <div className="flex flex-col absolute right-2 bottom-2 items-end">
          <div className="flex gap-1">
            <label htmlFor="category">Categoria:</label>
            <select {...register("category")} className="border rounded">
              <option>Filmes</option>
              <option>Opinião</option>
              <option>Outro</option>
            </select>
          </div>
          {errors.category && (
            <span className="text-red text-sm">{errors.category.message}</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-lightBlue text-white rounded-lg w-[15%] h-[50px] m-2"
      >
        Publicar post
      </button>
    </form>
  );
};

export default PostBox;
