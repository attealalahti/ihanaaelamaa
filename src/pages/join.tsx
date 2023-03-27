import type { InferGetStaticPropsType, NextPage } from "next";
import Header from "../components/layout/header";
import Head from "next/head";
import Footer from "../components/layout/footer";
import Page from "../components/layout/page";
import Post from "../components/content/post";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../server/trpc/router/_app";
import { createContext } from "../server/trpc/context";
import superjson from "superjson";
import { trpc } from "../utils/trpc";
import Custom404 from "../components/layout/custom-404";

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  await ssg.join.get.prefetch();
  await ssg.sponsor.all.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

const Join: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  const join = trpc.join.get.useQuery(undefined, { enabled: false });

  if (!join.data) return <Custom404 />;
  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <Header />
        <main className="flex w-full flex-1 flex-col">
          <Post
            data={{ ...join.data, imageUrl: join.data.image?.url ?? null }}
          />
        </main>
        <Footer />
      </Page>
    </>
  );
};

export default Join;
