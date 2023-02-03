import React from "react";
import Container from "../../components/common/Container";
import Layout from "../../components/layouts/Layout";
import PostsContainer from "./PostsContainer";
import { useSession } from "next-auth/react";
import { DashboardData } from "../../types";
import Pagination from "./Pagination";

type Props = {
  posts: DashboardData | undefined;
  goNextPage: () => void;
  goPrevPage: () => void;
};

export default function DashboardScreen({
  posts,
  goNextPage,
  goPrevPage,
}: Props) {
  const { data: userData } = useSession();
  return (
    <Layout>
      <Container title="My Dashboard">
        <div className="mt-4 flex w-full items-center rounded-md border-l-4 border-l-indigo-500 bg-white p-5 text-left shadow-sm md:text-left lg:text-left">
          <h2 className="text-xl font-bold md:text-2xl lg:text-2xl ">
            {`Welcome back,${userData?.user?.name} 👋`}
          </h2>
        </div>

        <PostsContainer posts={posts && posts!.posts} />

        <Pagination goNextPage={goNextPage} goPrevPage={goPrevPage} />
      </Container>
    </Layout>
  );
}
