import { Follow } from "@/types/types";
import React, { useContext, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import MessagesBox from "./MessagesBox";
import { UserContext } from "@/app/context/userSession";
import { CircularProgress } from "@mui/material";
import useSWR from "swr";
import { ChatContext } from "@/app/context/ChatContext";

const Menu = () => {
  const [isLoading, setIsloading] = useState(true);
  const user = useContext(UserContext);
  const {currentChat} = useContext(ChatContext);

  const getFollowing = async () => {
    if (user) {
      const data = await fetch("/api/getFollowing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followedById: user?.currentUser.id }),
      });
      const res = await data.json();
      setIsloading(false);
      const follows = sortFollowing({ data: res.data });
      return follows;
    }
  };

  const sortFollowing = ({ data }: { data: Follow[] }) => {
    data?.sort((a, b) => {
      const { messageTo: aT, messageFrom: aF } = a.following;
      const { messageTo: bT, messageFrom: bF } = b.following;
      const A = aT.concat(aF);
      const B = bT.concat(bF);
      A.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
      B.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
      if (!A[A.length - 1] || !B[B.length - 1]) {
        return 0;
      }

      return (
        Date.parse(B[B.length - 1].createdAt) -
        Date.parse(A[A.length - 1].createdAt)
      );
    });
    return data;
  };

  const { data } = useSWR<Follow[] | undefined>(
    "/api/getFollowing",
    getFollowing,
    { refreshInterval: 1 }
  );

  return (
    <div className={`bg-white h-full flex flex-col p-5 gap-5 w-full ${currentChat.id?"hidden":"block"} md:block 2xl:w-[30%] w-full xl: w-[40%]`}>
      <h1 className="text-3xl font-semibold ml-2 mt-10 text-center xl:text-left ">Mensagens</h1>
      <div className="flex items-center w-full">
        <IoSearchOutline className="absolute ml-2 text-gray-500" size={30} />
        <input
          className="border rounded-xl border-gray-300 pl-10 p-3 w-full"
          type="text"
          placeholder="Procure suas conversas..."
        />
      </div>
      <div className="flex-1 flex flex-col gap-5 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center">
            {" "}
            <CircularProgress />{" "}
          </div>
        ) : (
          data?.map((item: Follow) => (
            <MessagesBox item={item} key={item.followingId} />
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;
