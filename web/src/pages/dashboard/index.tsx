import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import DashboardScreen from "../../modules/dashboard/DashboardScreen";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { apiClient } from "../../libs/axios";
import { DashboardData } from "../../types";
import { trpc } from "../../utils/trpc";
import {
  InfiniteData,
  InitialDataFunction,
  useQueryClient,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { PostStatus } from "@prisma/client";

type Props = {
  posts: {
    posts:
      | {
          id: string;
          title: string;
          subtitle: string;
          status: PostStatus;
          image: string | null;
        }[]
      | undefined;
    nextCursor: string;
  };
};

//todo do ssr in trpc too

const DashboardPage = ({ posts }: Props) => {
  const session = useSession();
  const [page, setPage] = useState(0);
  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = trpc.posts.getPosts.useInfiniteQuery(
    { limit: 3, authorId: session.data?.user?.id as string },
    {
      initialData: () => {
        return {
          pages: [{ posts: posts.posts, nextCursor: posts.nextCursor }],
          pageParams: [posts.nextCursor],
        };
      },
      getNextPageParam: (lastPage) =>
        lastPage.nextCursor ? lastPage.nextCursor : undefined,
      keepPreviousData: true,
    }
  );
  console.log(hasNextPage, hasPreviousPage, data);
  return (
    <>
      <Head>
        <title>User Dashboard | DevBlog</title>
      </Head>
      <button
        onClick={async () => {
          setPage((page) => page + 1);
          console.log(data?.pageParams);
          await fetchNextPage();
        }}
        className="border border-black"
      >
        push
      </button>
      <button
        className="ml-4 border border-black"
        onClick={async () => {
          setPage((page) => page - 1);
          console.log(data?.pageParams);
          await fetchPreviousPage();
        }}
      >
        back
      </button>
      <DashboardScreen posts={data?.pages[page]} />
    </>
  );
};
export default DashboardPage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  const { data: posts } = await apiClient.get(
    `/dashboard?authorId=${session?.user?.id}`
  );
  return {
    props: { posts },
  };
};
