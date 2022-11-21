import React from "react";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Layout from "../../components/layouts/Layout";

import { trpc } from "../../utils/trpc";
import PostsContainer from "./PostsContainer";
export default function DashboardScreen() {
  const { isLoading, data: posts } = trpc.posts.getPosts.useQuery();
  return (
    <Layout>
      <Container title="My Dashboard">
        <div className=" align-items mt-4 mb-4 flex flex-col gap-4 -space-y-px md:flex-row xl:flex-row ">
          <input
            name="email"
            type="email"
            className=" w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base lg:w-96"
            placeholder="Type something.."
          />
          <Button text="Search Posts" type="submit" />
        </div>
        {isLoading ? (
          <div className="mt-20 flex animate-spin items-center justify-center">
            <LoadingSpinner className="h-12 w-14" />
          </div>
        ) : (
          <PostsContainer posts={posts} />
        )}
      </Container>
    </Layout>
  );
}
