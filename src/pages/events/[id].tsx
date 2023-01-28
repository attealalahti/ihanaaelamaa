import type {
  GetStaticPropsContext,
  GetStaticPaths,
  NextPage,
  InferGetStaticPropsType,
} from "next";
import Header from "../../components/header";
import Head from "next/head";
import Footer from "../../components/footer";
import Page from "../../components/page";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../../server/trpc/router/_app";
import { createContext } from "../../server/trpc/context";
import superjson from "superjson";
import { prisma } from "../../server/db/client";
import { trpc } from "../../utils/trpc";

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });
  const id = Number(context.params?.id);
  await ssg.event.byId.prefetch({ id });
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
  const event = trpc.event.byId.useQuery({ id }, { enabled: false });

  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <Header />
        <main className="flex flex-1 flex-wrap items-center justify-center">
          {event.data && (
            <>
              <div className="m-10 flex max-w-4xl flex-col gap-10 text-white md:gap-16">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                  {event.data.title}
                </h1>
                <div className="flex flex-col gap-6 text-lg lg:text-xl">
                  {event.data.content.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <></>
            </>
          )}
        </main>
        <Footer />
      </Page>
    </>
  );
};

export default Event;
