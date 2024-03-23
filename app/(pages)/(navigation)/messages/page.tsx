"use client";
import React, { Suspense } from "react";
import Menu from "./components/Menu";
import Chat from "./components/Chat";
import Context from "@/app/context/Provider";
import { CircularProgress } from "@mui/material";

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="h-full items-center justify-center">
          <CircularProgress></CircularProgress>/
        </div>
      }
    >
      <section className="w-full mx-[5%]  gap-3 bg-white relative flex bg-[#EEF1F1]">
        <div className="2xl:w-[30%] w-[40%] ">
          <Menu />
        </div>
        <div className="w-full ">
          <Chat />
        </div>
      </section>
    </Suspense>
  );
};

export default page;
