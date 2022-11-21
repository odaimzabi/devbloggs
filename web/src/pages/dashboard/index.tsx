import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import DashboardScreen from "../../modules/dashboard/DashboardScreen";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const DashboardPage = () => {
  return (
    <>
      <Head>
        <title>User Dashboard | DevBlog</title>
      </Head>
      <DashboardScreen />
    </>
  );
};
export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
