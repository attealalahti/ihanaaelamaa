import { router } from "../trpc";
import { authRouter } from "./auth";
import { eventRouter } from "./event";
import { exampleRouter } from "./example";
import { homeRouter } from "./home";
import { imageRouter } from "./image";
import { joinRouter } from "./join";
import { sponsorRouter } from "./sponsor";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  event: eventRouter,
  home: homeRouter,
  image: imageRouter,
  join: joinRouter,
  sponsor: sponsorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
