"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserSearchType } from "@/types/types";
import { FaRegBell } from "react-icons/fa";
import { ImBlogger } from "react-icons/im";
import { IoPersonCircle } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import useSWR from "swr";
import { UserContext } from "@/app/context/userSession";

type messagesReceived = {
  read: boolean;
};

const NavBar = () => {
  const { data } = useSWR<messagesReceived[]>(
    "/api/getMessageReceived",
    getNotifications,
    { refreshInterval: 5 }
  );
  const [notifications, setNotifications] = useState<number | null>(null);
  const [users, setUsers] = useState<UserSearchType[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [userNotFound, setUserNotFound] = useState(false);

  async function getNotifications() {
    const data = await fetch("/api/getMessageReceived", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageToId: currentUser.id }),
    });
    const res = await data.json();
    return res.data;
  }
  useEffect(() => {
    if (data) {
      const not = data.filter((item: { read: boolean }) => item.read === false);
      setNotifications(not.length);
    }
  }, [data]);

  const getUsers = async () => {
    setLoading(true);
    const data = await fetch("/api/getUsersSearched", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search, userId: currentUser?.id }),
    });
    const res = await data.json();
    setUsers(res.data);
    if (res.data.length === 0) {
      setUserNotFound(true);
    }
    else{
      setUserNotFound(false)
    }
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
  useEffect(() => {
    if (search) {
      getUsers();
    } else {
      setUsers([]);
      setUserNotFound(false);
    }
  }, [search]);

  return (
    <nav className="flex items-center justify-evenly p-4 bg-white">
      <div className="flex items-center gap-3">
        <ImBlogger size={30} />
        <h1>BLOG</h1>
      </div>
      <div className="flex flex-col w-full items-center relative">
        <input
          type="text"
          placeholder="Procurando um amigo?"
          className="w-2/5 p-4 rounded-lg border-gray-200 border focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        { loading ? (
          <div className="absolute border border-gray-200 top-14 bg-white w-2/5 rounded-b-lg flex justify-center z-[11] p-4 ">
            <CircularProgress size={20}/>
          </div>
        ) : (
          <ul className="absolute border border-t-0  border-lightGray top-14 bg-white w-2/5 rounded-b-lg z-[11]  ">
            {users.map((user) => (
              <Link
                href={`/profile/${user.id}`}
                className="flex gap-5 items-center m-2"
                onClick={() => setSearch("")}
                key={user.id}
              >
                {user.profileImg ? (
                  <div className="w-[50px] h-[50px] rounded-full relative">
                    <Image
                      src={user.profileImg}
                      alt="Imagem de perfil"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                ) : (
                  <IoPersonCircle size={50} />
                )}
                <div className="flex flex-col gap-2">
                  <h1>{user.displayName}</h1>
                  <h2 className="text-lightGray">@{user.username}</h2>
                </div>
              </Link>
            ))}
          </ul>
        )}
        {userNotFound && !loading && (
          <div className="absolute border border-t-0 top-14 bg-white w-2/5 p-2 flex justify-center rounded-b-lg z-[11] text-lightGray">
            <span>Não foi possível encontrar esse usuário.</span>
          </div>
        )}
      </div>
      <Link href={"/messages"}>
        <div className="rounded-[50%] p-1 border border-black flex relative ">
          <FaRegBell size={30} color="black" />
          {notifications !== 0 && (
            <div className="p-2 w-5 h-5 rounded-full bg-[#DD0000] absolute right-0 bottom-0 flex items-center justify-center text-white">
              <span>{notifications}</span>
            </div>
          )}
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
