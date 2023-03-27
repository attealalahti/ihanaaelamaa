import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { type NextPage } from "next";
import Custom404 from "../components/layout/custom-404";
import { createContext } from "../server/trpc/context";
import { appRouter } from "../server/trpc/router/_app";
import superjson from "superjson";

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  await ssg.sponsor.all.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

const Custom404Page: NextPage = () => {
  return <Custom404 />;
};

export default Custom404Page;
