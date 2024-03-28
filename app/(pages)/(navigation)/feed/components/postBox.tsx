"use client";
import React, { useContext, useEffect, useState } from "react";
import { createPostSchema } from "@/schemas/createPostSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserContext } from "@/app/context/userSession";
import getUserInfo from "@/utils/getUserInformation";
import { useRouter } from "next/navigation";

type createPostType = z.infer<typeof createPostSchema>;

const PostBox = () => {
  const { currentUser } = useContext(UserContext);
  const [username, setUsername] = useState();
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [categoriesError, setCategoriesError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUserInfos = async () => {
      const res = await getUserInfo(currentUser.id);
      setUsername(res.data.username);
    };
    if (currentUser?.id) {
      getUserInfos();
    }
  }, [currentUser]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<createPostType>({
    defaultValues: { title: "", content: "" },
    resolver: zodResolver(createPostSchema),
  });

  useEffect(() => {
    setTimeout(() => {
      reset();
    }, 3000);
  }, [isSubmitSuccessful, reset]);

  const handleOnClickPublishButton = (data: createPostType) => {
    fetch("/api/newPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        categories,
        authorId: currentUser.id,
      }),
    }).then(() => {
      setCategories([]);
      router.refresh();
    });
  };

  const handleAddCategory = (category: string) => {
    setCategoriesError("");
    if (category.length === 0) {
      return 0;
    }
    const categoriesAlreadyExists = categories.includes(category);
    if (categoriesAlreadyExists) {
      setCategoriesError("Essa categoria já foi adicionada ao post!");
      return 0;
    }
    setCategories((prevState) => [category, ...prevState]);
    setCategory("");
  };

  const handleRemoveCategory = (category: string) => {
    const tempCategories = categories.filter((val) => val !== category);
    setCategories(tempCategories);
  };

  return (
    <form
      className="w-full flex flex-col gap-5 p-1 md:p-5 "
      onSubmit={handleSubmit(handleOnClickPublishButton)}
    >
      <div className="bg-white h-[200px] rounded-lg relative flex flex-col">
        <div className="w-full flex flex-col">
          <input
            className=" text-left rounded-sm p-2 focus:outline-none"
            placeholder="Titulo"
            {...register("title")}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>
        <div className="flex-1 w-full  flex flex-col">
          <textarea
            className="flex-1 border-0 text-left rounded-lg p-2 focus:outline-none"
            placeholder={
              username && `Compartilhe o que está na sua mente, ${username}... `
            }
            {...register("content")}
          />
          {errors.content && (
            <span className="text-red-500 text-sm">
              {errors.content.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2 w-full items-center">
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-2 w-full">
            <input
              className="w-full lg:w-1/2 px-2 border border-gray-300 rounded py-1 text-sm md:text-lg focus:outline-none"
              placeholder="Deseja adicionar uma categoria?"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <span
              className="text-2xl cursor-pointer"
              onClick={() => handleAddCategory(category)}
            >
              +
            </span>
          </div>
          {categoriesError && (
            <span className="text-red-500 text-sm">{categoriesError}</span>
          )}
        </div>
      </div>
      <div className="flex-col flex">
        <div className="flex gap-2 px-5 py-2 relative h-fit flex-wrap">
          {categories.length > 0 &&
            categories.map((category, index) => {
              if (index <= 5) {
                return (
                  <div
                    key={category}
                    className="md:basis-[100px] basis-[50px] min-w-fit bg-darkBlue text-sm md:text-md flex justify-evenly items-center text-white rounded-lg p-2 hover:bg-red-500 hover:text-black gap-2 cursor-pointer"
                    onClick={() => handleRemoveCategory(category)}
                  >
                    <span>{category}</span>
                    <span className="text-sm ">X</span>
                  </div>
                );
              }
            })}
          {categories.length > 6 && (
            <div
              className="md:basis-[50px] basis-[50px] min-w-fit bg-darkBlue text-sm md:text-md flex justify-evenly items-center text-white rounded-lg p-2 "
              onClick={() => handleRemoveCategory(category)}
            >
              <span>...</span>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-darkBlue text-white rounded-lg w-fit h-[50px] right-2 self-end text-nowrap px-2 "
        >
          Publicar post
        </button>
      </div>
    </form>
  );
};

export default PostBox;
