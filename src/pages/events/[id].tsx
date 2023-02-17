import type {
  GetStaticPropsContext,
  GetStaticPaths,
  NextPage,
  InferGetStaticPropsType,
} from "next";
import Header from "../../components/layout/header";
import Head from "next/head";
import Footer from "../../components/layout/footer";
import Page from "../../components/layout/page";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/trpc/router/_app";
import { createContext } from "../../server/trpc/context";
import superjson from "superjson";
import { prisma } from "../../server/db/client";
import { trpc } from "../../utils/trpc";
import Custom404 from "../../components/layout/custom-404";
import Post from "../../components/content/post";

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });
  const id = Number(context.params?.id);
  await ssg.event.byIdVisible.prefetch({ id });
  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await prisma.event.findMany({
    select: { id: true },
    where: { visible: true },
  });
  return {
    paths: events.map(({ id }) => ({ params: { id: id.toString() } })),
    fallback: "blocking",
  };
};

const Event: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  id,
}) => {
  const event = trpc.event.byIdVisible.useQuery({ id }, { enabled: false });

  if (!event.data) return <Custom404 />;
  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <Header />
        <main className="flex w-full max-w-4xl flex-1">
          <Post data={event.data} />
        </main>
        <Footer />
      </Page>
    </>
  );
};

export default Event;
