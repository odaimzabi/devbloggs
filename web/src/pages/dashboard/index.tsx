import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import DashboardScreen from "../../modules/dashboard/DashboardScreen";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { apiClient } from "../../libs/axios";
import { DashboardData } from "../../types";

type Props = {
  posts: DashboardData;
};

const DashboardPage = ({ posts }: Props) => {
  return (
    <>
      <Head>
        <title>User Dashboard | DevBlog</title>
      </Head>
      <DashboardScreen posts={posts} />
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
  const { data: posts } = await apiClient.get<DashboardData>(
    `/dashboard?authorId=${session?.user?.id}`
  );
  return {
    props: { posts },
  };
};
