"use client";
import { UserContext } from "@/app/context/userSession";
import React, { useContext, useEffect, useState } from "react";

const FollowButton = ({
  params,
  user,
}: {
  params: { id: string };
  user: any;
}) => {
  const { currentUser } = useContext(UserContext);
  const [followedBy, setFollowedBy] = useState<number>(user.followedBy.length);
  const [isFollowed, setIsFollowed] = useState(false);

  const handleOnClickFollow = async () => {
    setIsFollowed((prevState) => !prevState);
    if (isFollowed) {
      setFollowedBy((prevState) => prevState - 1);
    } else {
      setFollowedBy((prevState) => prevState + 1);
    }
    await fetch("/api/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser.id,
        profileId: params.id,
      }),
    });
  };
  function userIsFollowed(
    data: {
      followedById: String;
      followingId: String;
    }[]
  ) {
    const found = data.find((item) => item.followedById === currentUser?.id);
    if (found) {
      setIsFollowed(true);
    } else {
      setIsFollowed(false);
    }
  }
  useEffect(() => {
    userIsFollowed(user.followedBy);
  }, [currentUser]);

  

  return (
    <div className="flex flex-col">
      <button
        className="text-white bg-darkBlue h-fit px-6 py-2 m-5 rounded-xl hover:scale-[1.15]"
        onClick={handleOnClickFollow}
      >
        {isFollowed ? "Deixar de seguir" : "Seguir +"}{" "}
      </button>
      <div className="flex gap-5">
        <h2>Seguindo: {user.following.length}</h2>
        <h2>Seguidores: {followedBy}</h2>
      </div>
    </div>
  );
};

export default FollowButton;
