import superjson from "superjson";
import { createTRPCReact, loggerLink } from "@trpc/react-query";
import { render as defaultRender } from "@testing-library/react";
import { NextRouter } from "next/router";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { AppRouter } from "../../server/trpc/router/_app";
import AppProvider from "../../components/providers/AppProvider";
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { CustomAppProps } from "../../pages/_app";
import { Session } from "next-auth";
import fetch from "cross-fetch";
export const trpcRequest = createTRPCReact<AppRouter>();
globalThis.fetch = fetch;
export function render(
  ui: RenderUI,
  { router = {}, ...options }: RenderOptions = {}
) {
  return defaultRender(ui, {
    wrapper: function Wrapper({ children }) {
      const [queryClient] = useState(() => new QueryClient());

      const [trpcClient] = useState(() =>
        trpcRequest.createClient({
          transformer: superjson,
          links: [loggerLink()],
        })
      );

      // Note: Session is null until mocked in test or logged in -- see above
      const pageProps: CustomAppProps = {
        session: null,
      };
      return (
        <RouterContext.Provider value={{ ...mockRouter, ...router }}>
          <trpcRequest.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
              <AppProvider pageProps={pageProps}>{children}</AppProvider>
            </QueryClientProvider>
          </trpcRequest.Provider>
        </RouterContext.Provider>
      );
    },
    ...options,
  });
}

export const mockRouter: NextRouter = {
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(() => Promise.resolve()),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: false,
  isPreview: false,
};

export type DefaultParams = Parameters<typeof defaultRender>;
export type RenderUI = DefaultParams[0];
export type RenderOptions = DefaultParams[1] & {
  router?: Partial<NextRouter>;
  session?: Session | null;
};
