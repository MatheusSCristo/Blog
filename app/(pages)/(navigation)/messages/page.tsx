"use client";
import React, { Suspense} from "react";
import Menu from "./components/Menu/Menu";
import Chat from "./components/Chat/Chat";
import { CircularProgress } from "@mui/material";
import MobileChat from "./components/Chat/MobileChat";

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="h-full items-center justify-center">
          <CircularProgress></CircularProgress>/
        </div>
      }
    >
      <section className="w-full md:mx-[5%] mx-1 gap-3 bg-white relative flex bg-[#EEF1F1]">
        <Menu />
        <div className="w-full hidden xl:block ">
          <Chat />
        </div>
        <div className="w-full xl:hidden">
          <MobileChat />
        </div>
      </section>
    </Suspense>
  );
};

export default page;
