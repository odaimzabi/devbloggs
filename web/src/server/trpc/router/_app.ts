// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { postsRouter } from "./posts";
import { authRouter } from "./auth";
import { siteRouter } from "./site";

export const appRouter = router({
  posts: postsRouter,
  auth: authRouter,
  site: siteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
