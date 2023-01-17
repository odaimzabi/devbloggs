// src/pages/_app.tsx
import "../styles/globals.css";
import type { Session } from "next-auth";
import { trpc } from "../utils/trpc";
import { AppProps as NextAppProps } from "next/app";
import AppProvider from "../components/providers/AppProvider";

export type CustomAppProps = {
  session: Session | null | undefined;
};

export type AppProps = NextAppProps<CustomAppProps>;
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProvider pageProps={pageProps}>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}
export default trpc.withTRPC(MyApp);
