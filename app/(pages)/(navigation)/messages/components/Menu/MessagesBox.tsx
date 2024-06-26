import { ChatContext } from "@/app/context/ChatContext";
import { MessageContext } from "@/app/context/MessagesContext";
import { Follow, Message } from "@/types/types";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";

const MessagesBox = ({ item }: { item: Follow }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { currentChat, setCurrentChat } = useContext(ChatContext);
  const messageContext = useContext(MessageContext);
  const [messagesUnread, setMessagesUnread] = useState<number | null>(null);
  const { following: receiver } = item;
  const [messages, setMessages] = useState<Message[]>([]);

  const orderMessages = () => {
    const { messageFrom, messageTo } = receiver;
    const messages = messageFrom.concat(messageTo);
    messages.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    setMessages(messages);
    if (
      messageContext?.messages &&
      messageContext?.messages.id === receiver.id
    ) {
      messageContext?.setMessages({
        id: receiver.id,
        messages: messages,
      });
    }
    setIsLoading(false);
  };

  const getMessagesUnread = () => {
    if (receiver.messageFrom) {
      const data = receiver.messageFrom.filter((item) => item.read === false);
      setMessagesUnread(data.length);
    }
  };

  useEffect(() => {
    getMessagesUnread();
    orderMessages();
  }, [receiver.messageFrom, receiver.messageTo]);

  const Handle = async () => {
    setCurrentChat({
      displayName: receiver.displayName,
      id: receiver.id,
      profileImg: receiver.profileImg,
      username: receiver.username,
    });
    messageContext?.setMessages({
      id: receiver.id,
      messages: messages,
    });

    await fetch("/api/updateMessage", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageFromId: receiver.id }),
    });
  };

  const getTimeAgo = (time: string) => {
    const res = (Date.now() - Date.parse(time)) / 60000;
    if (!res) return "";
    else if (res < 1) {
      return `${(res * 60).toFixed(0)}s`;
    } else if (res.toFixed(0) === "1") {
      return "1m";
    } else if (res >= 1 && res < 60) {
      return `${res.toFixed(0)}m`;
    } else if (res > 60 && res < 1440) {
      return `${(res / 60).toFixed(0)}h`;
    } else if (res > 1440 && res < 2880) {
      return "1d.";
    } else {
      return `${(res / 1440).toFixed(0)}d`;
    }
  };

  return (
    <div
      className="flex py-2 pl-1 gap-3 border-b border-gray-200 h-[60px] items-center cursor-pointer hover:scale-[1.01] relative items-center overflow-hidden justify-between"
      onClick={Handle}
    >
      {receiver.profileImg ? (
        <div className="w-[50px] h-[50px] relative">
          <Image
            src={receiver.profileImg}
            alt="Imagem de perfil"
            fill
            className="object-cover rounded-full"
          />
        </div>
      ) : (
        <div className="rounded-full p-2 flex items-center bg-darkBlue h-fit">
          <IoPersonOutline size={30} className="text-white" />
        </div>
      )}
      <div className="flex flex-col max-h-[70px] overflow-hidden flex-1">
        <h1 className="text-md font-bold">
          {receiver.displayName
            ? receiver.displayName
            : `@${receiver.username}`}
        </h1>
        {isLoading ? (
          <div className="h-1/2 w-full flex items-center justify-center">
            <CircularProgress size={20} />
          </div>
        ) : (
          messages &&
          messages.length > 0 && (
            <p className="text-sm text-lightGray break-all  ">
              {messages[messages.length - 1].content}
            </p>
          )
        )}
      </div>
      <div className=" flex flex-col justify-between">
        <span className="text-gray-500 text-sm">
          {getTimeAgo(messages[messages.length - 1]?.createdAt)}
        </span>
        {item.following.messageFrom[item.following.messageFrom.length - 1] &&
          !item.following.messageFrom[item.following.messageFrom.length - 1]
            .read && (
            <div className="bg-[#DD0000] p-2 rounded-full w-5 h-5 flex items-center justify-center">
              <span className="text-white text-sm">{messagesUnread}</span>
            </div>
          )}
      </div>
    </div>
  );
};

export default MessagesBox;
