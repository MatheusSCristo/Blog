"use client";
import { ChatContext } from "@/app/context/ChatContext";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoPersonOutline, IoSendOutline } from "react-icons/io5";
import { CircularProgress } from "@mui/material";
import { UserContext } from "@/app/context/userSession";
import { Message } from "@/types/types";
import "./styles.css";
import { MessageContext } from "@/app/context/MessagesContext";

const Chat = () => {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);
  const chatUser = useContext(ChatContext);
  const messageContext = useContext(MessageContext);
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (messageContext?.messages !== undefined) {
      setIsLoading(true);
      setMessages(messageContext?.messages.messages);
      setIsLoading(false);
    }
  }, [messageContext?.messages?.messages]);

  const handleOnClickSendMessage = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setContent("");
    if (content) {
      await fetch("/api/createMessage", {
        method: "POST",
        body: JSON.stringify({
          content,
          messageToId: chatUser?.currentChat.id,
          messageFromId: user?.currentUser.id,
          read: false,
        }),
      });
    }
  };

  const showMessageHour = (time: string) => {
    const date = new Date(time);
    if (date.getMinutes() < 10) {
      return `${date.getHours()}:0${date.getMinutes()}`;
    }
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    chatUser?.currentChat && (
      <div className="flex flex-col h-full bg-[#EEF1F1] max-h-screen ">
        <div className="flex gap-5 items-center border-b-2 px-5 mx-2 py-5  bg-white">
          {chatUser?.currentChat.profileImg ? (
            <Image
              src={chatUser?.currentChat.profileImg}
              alt="Imagem de perfil"
              width={50}
              height={50}
            />
          ) : (
            <div className="rounded-full p-2 flex items-center bg-lightBlue h-fit">
              <IoPersonOutline size={30} />
            </div>
          )}
          <h1>
            {chatUser?.currentChat.displayName
              ? chatUser?.currentChat.displayName
              : `@${chatUser?.currentChat.username}`}
          </h1>
        </div>
        <div
          className="flex flex-1 flex-col gap-10 relative overflow-y-auto snap-y  p-5 chat"
          ref={containerRef}
        >
          {isLoading ? (
            <div className=" h-full w-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ) : (
            messageContext?.messages.messages &&
            messages?.map((item) => {
              return (
                <div className="w-full flex flex-col" key={item.id}>
                  <div
                    className={` ${
                      item.messageFromId === chatUser.currentChat.id
                        ? "self-start"
                        : "self-end"
                    } w-1/2`}
                  >
                    <div
                      className={`flex items-end gap-2 ${
                        item.messageFromId === chatUser.currentChat.id
                          ? "flex-row"
                          : "flex-row-reverse"
                      }`}
                    >
                      {item.messageFrom.profileImg ? (
                        <div className="relative w-[50px] h-[50px] rounded-full">
                          <Image
                            src={item.messageFrom.profileImg}
                            alt="Imagem de perfil"
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="bg-white rounded-full p-1">
                          {" "}
                          <IoPersonOutline size={30} />{" "}
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <div
                          className={`p-5  ${
                            item.messageFromId === chatUser.currentChat.id
                              ? "rounded-bl-none bg-white"
                              : "rounded-br-none bg-[#44b9dca6]"
                          }  rounded-2xl `}
                        >
                          <h1>{item.content}</h1>
                        </div>
                        <span
                          className={` ${
                            item.messageFromId === chatUser.currentChat.id
                              ? "self-start"
                              : "self-end"
                          }`}
                        >
                          {showMessageHour(item.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <form
          className="w-full flex items-center relative  p-2"
          onSubmit={handleOnClickSendMessage}
        >
          <input
            className="border border-gray-300 rounded-full w-full p-4 pr-[50px]"
            placeholder="Envie sua mensagem"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="absolute right-5" type="submit">
            <IoSendOutline size={30} />
          </button>
        </form>
      </div>
    )
  );
};

export default Chat;
