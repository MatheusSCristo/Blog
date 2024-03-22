import React, { Suspense } from "react";
import PostBox from "./components/postBox";
import GetPosts from "./components/getPosts";
import LoadingComponents from "../components/loadingComponents";
import Following from "./components/Following";

const Home = () => {
  return (
    <div className="flex flex-col mx-16 w-full">
      <h1 className="text-2xl my-5 font-bold">Feed</h1>
      <section className="w-full h-full grid grid-cols-3 gap-5">
        <PostBox />
        <Following />
        <Suspense fallback={<LoadingComponents />}>
          <GetPosts isAuthor={false} />
        </Suspense>
      </section>
    </div>
  );
};

export default Home;
