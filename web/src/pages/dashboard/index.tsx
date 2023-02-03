import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import DashboardScreen from "../../modules/dashboard/DashboardScreen";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { apiClient } from "../../libs/axios";
import { trpc } from "../../utils/trpc";
import {
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { PostStatus } from "@prisma/client";

//todo you need total count in order to see how many pages are there exactly
// and then decide if you want to paginate more or not
// getPreviousPageparam is not needed i guess
type Props = {
  posts: {
    pages: number;

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
    prevCursor: string;
  };
};

const DashboardPage = ({ posts }: Props) => {
  const session = useSession();
  const [page, setPage] = useState(0);
  const { data, fetchNextPage, fetchPreviousPage, hasNextPage } =
    trpc.posts.getPosts.useInfiniteQuery(
      { limit: 6, authorId: session.data?.user?.id as string },
      {
        enabled: !!session?.data?.user?.id,
        initialData: () => {
          return {
            pages: [
              {
                posts: posts.posts,
                nextCursor: posts.nextCursor,
                prevCursor: posts.prevCursor,
              },
            ],
            pageParams: [undefined],
          };
        },
        keepPreviousData: true,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  const goNextPage = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
    if (page == posts.pages - 1) return;
    setPage((page) => page + 1);
  };
  const goPrevPage = async () => {
    if (!(page > 0) || page == 0) return;
    setPage((page) => page - 1);
    await fetchPreviousPage();
  };
  return (
    <>
      <Head>
        <title>User Dashboard | DevBlog</title>
      </Head>

      <DashboardScreen
        posts={data?.pages[page]}
        goNextPage={goNextPage}
        goPrevPage={goPrevPage}
      />
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
    `/dashboard?authorId=${session?.user?.id}&limit=6`
  );
  return {
    props: { posts },
  };
};
