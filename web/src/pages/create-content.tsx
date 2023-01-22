import React from "react";
import CreateContentScreen from "../modules/create-content/CreateContentScreen";
import { GetServerSideProps } from "next";
import { getServerAuthSession } from "../server/common/get-server-auth-session";

function CreateContentPage() {
  return <CreateContentScreen />;
}

export default CreateContentPage;

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
