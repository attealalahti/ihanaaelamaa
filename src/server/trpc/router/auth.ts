import { router, protectedProcedure } from "../trpc";
import axios from "axios";
import { env } from "../../../env/server.mjs";

export const authRouter = router({
  build: protectedProcedure.mutation(async () => {
    const res = await axios.post(env.BUILD_HOOK_URL, {});
    console.log(res);
  }),
});
