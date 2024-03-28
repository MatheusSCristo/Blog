import React, { Suspense } from "react";
import PostBox from "./components/postBox";
import GetPosts from "./components/getPosts";
import LoadingComponents from "../components/loadingComponents";
import Following from "./components/Following";

const Home = () => {
  return (
    <div className="flex flex-col mx-2 md:mx-12 w-full">
      <h1 className="text-2xl my-5 font-bold">Feed</h1>
      <section className="w-full h-full grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-5 auto-cols-max ">
        <div className="bg-white col-start-1 md:col-end-3 col-span-3 rounded">
          <PostBox />
        </div>
        <div className="hidden md:block">
        <Following />
        </div>
        <Suspense fallback={<LoadingComponents />}>
          <GetPosts isAuthor={false} />
        </Suspense>
      </section>
    </div>
  );
};

export default Home;
