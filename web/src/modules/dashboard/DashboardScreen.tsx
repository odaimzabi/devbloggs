import React from "react";
import Container from "../../components/common/Container";
import Layout from "../../components/layouts/Layout";
import PostsContainer from "./PostsContainer";
import { useSession } from "next-auth/react";
import { DashboardData } from "../../types";

type Props = {
  posts: DashboardData;
};

export default function DashboardScreen({ posts }: Props) {
  const { data: userData } = useSession();
  return (
    <Layout>
      <Container title="My Dashboard">
        <div className="mt-4 flex w-full items-center rounded-md bg-white p-5 text-left shadow-sm md:text-left lg:text-left">
          <h2 className="text-2xl font-bold ">
            {`Welcome back,${userData?.user?.name} 👋`}
          </h2>
        </div>

        <PostsContainer posts={posts!.posts} />
      </Container>
    </Layout>
  );
}
