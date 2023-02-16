import { router } from "../trpc";
import { authRouter } from "./auth";
import { eventRouter } from "./event";
import { exampleRouter } from "./example";
import { homeRouter } from "./home";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  event: eventRouter,
  home: homeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
