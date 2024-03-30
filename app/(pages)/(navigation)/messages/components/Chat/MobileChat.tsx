"use client";
import { ChatContext, currentChat } from "@/app/context/ChatContext";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoPersonOutline, IoSendOutline } from "react-icons/io5";
import { CircularProgress } from "@mui/material";
import { UserContext } from "@/app/context/userSession";
import { Message } from "@/types/types";
import "./styles.css";
import { MessageContext } from "@/app/context/MessagesContext";
import handleSendMessage from "./utils/handleSendMessage";
import displayMessageHour from "./utils/displayMessageHour";
import { FaCircleChevronLeft } from "react-icons/fa6";

const MobileChat = () => {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);
  const { currentChat, setCurrentChat } = useContext(ChatContext);
  const user = useContext(UserContext);
  const messageContext = useContext(MessageContext);
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
    handleSendMessage(e, content, currentChat.id, user.currentUser.id);
    setContent("");
  };

  return (
    currentChat.id && (
      <div className="flex flex-col h-full bg-[#EEF1F1]  ">
        <div className="flex gap-2 items-center border-b-2 px-2 mx-2 py-5 bg-white">
          <FaCircleChevronLeft
            size={20}
            className="text-darkBlue cursor-pointer"
            onClick={() => setCurrentChat({} as currentChat)}
          />
          {currentChat.profileImg ? (
            <div className="w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px] relative">
              <Image
                src={currentChat.profileImg}
                alt="Imagem de perfil"
                fill
                className="object-cover rounded-full"
              />
            </div>
          ) : (
            <div className="rounded-full p-2 flex items-center bg-darkBlue w-[50px] h-[50px] 2xl:w-[60px] 2xl:h-[60px]">
              <IoPersonOutline
                className="text-white object-cover fill"
                size={"full"}
              />
            </div>
          )}
          <h1>
            {currentChat.displayName
              ? currentChat.displayName
              : `@${currentChat.username}`}
          </h1>
        </div>
        <div
          className="flex h-full max-h-[350px] flex-col gap-10 relative overflow-y-scroll snap-y  p-5 chat"
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
                <div className="w-full flex flex-col " key={item.id}>
                  <div>
                    <div className={`flex items-end gap-2 flex-col `}>
                      <div
                        className={`p-3 flex w-3/4 h-[400px]${
                          item.messageFromId === currentChat.id
                            ? "rounded-bl-none bg-[#ffffff] text-black"
                            : "rounded-br-none bg-darkBlue text-white"
                        }  rounded-2xl   ${
                          item.messageFromId === currentChat.id
                            ? "self-start"
                            : "self-end"
                        } w-full`}
                      >
                        <p className="break-all ">{item.content}</p>
                      </div>
                      {item.messageFrom.profileImg ? (
                        <div
                          className={` ${
                            item.messageFromId === currentChat.id
                              ? "self-start"
                              : "self-end"
                          }  relative w-[40px] h-[40px] rounded-full`}
                        >
                          <Image
                            src={item.messageFrom.profileImg}
                            alt="Imagem de perfil"
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                      ) : (
                        <div
                          className={` ${
                            item.messageFromId === currentChat.id
                              ? "self-start"
                              : "self-end"
                          } bg-darkBlue rounded-full p-2 h-[40px] w-[40px] `}
                        >
                          <IoPersonOutline
                            className="text-white object-cover fill"
                            size={"full"}
                          />
                        </div>
                      )}
                      <span
                        className={` ${
                          item.messageFromId === currentChat.id
                            ? "self-start"
                            : "self-end"
                        }`}
                      >
                        {displayMessageHour(item.createdAt)}
                      </span>
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

export default MobileChat;
