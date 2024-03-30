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
import handleSendMessage from "./utils/handleSendMessage";
import displayMessageHour from "./utils/displayMessageHour";

const Chat = () => {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);
  const {currentChat,setCurrentChat} = useContext(ChatContext);
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
    handleSendMessage(
      e,
      content,
      currentChat.id,
      user.currentUser.id
    );
    setContent("");
  };

    return currentChat.id ? (
    <div className="flex flex-col h-full bg-[#EEF1F1]  ">
      <div className="flex gap-5 items-center border-b-2 px-5 mx-2 py-5 bg-white">
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
        className="flex md:h-[400px] 2xl:h-[700px] flex-col gap-10 relative overflow-y-scroll snap-y  p-5 chat"
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
                <div
                  className={` ${
                    item.messageFromId === currentChat.id
                      ? "self-start"
                      : "self-end"
                  } w-1/2`}
                >
                  <div
                    className={`flex items-end gap-2 ${
                      item.messageFromId === currentChat.id
                        ? "flex-row"
                        : "flex-row-reverse"
                    }`}
                  >
                    {item.messageFrom.profileImg ? (
                      <div className="relative w-[40px] h-[40px] rounded-full">
                        <Image
                          src={item.messageFrom.profileImg}
                          alt="Imagem de perfil"
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="bg-darkBlue rounded-full p-2 h-[40px] w-[40px]">
                        <IoPersonOutline
                          className="text-white object-cover fill"
                          size={"full"}
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-2 flex-1">
                      <div
                        className={`p-3  ${
                          item.messageFromId === currentChat.id
                            ? "rounded-bl-none bg-[#ffffff] text-black"
                            : "rounded-br-none bg-darkBlue text-white"
                        }  rounded-2xl `}
                      >
                        <span>{item.content}</span>
                      </div>
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
  ) : (
    <div className="flex items-center justify-center bg-bgGray h-full ">
      <h1 className="p-5 2xl:p-10 shadow-2xl bg-darkBlue text-white rounded-xl">
        Procure seus amigos para começar uma conversa.
      </h1>
    </div>
  );
};

export default Chat;
