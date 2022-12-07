// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import Favicon from "../components/common/Favicon";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Favicon />
      <SessionProvider session={session}>
        <NextNProgress color="#FC4519" />
        <Component {...pageProps} />
        <Toaster position="bottom-right" />
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
