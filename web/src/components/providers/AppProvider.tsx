import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import Favicon from "../common/Favicon";
import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";
import { AppProps } from "../../pages/_app";

type Props = {
  pageProps: AppProps["pageProps"];
  children: ReactNode;
};

function AppProvider({ pageProps, children }: Props) {
  const { session } = pageProps;
  return (
    <>
      <Favicon />
      <SessionProvider session={session}>
        <NextNProgress color="#FC4519" />
        <Toaster position="bottom-right" />
        {children}
      </SessionProvider>
    </>
  );
}

export default AppProvider;
