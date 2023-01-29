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
import Custom404 from "../../components/custom-404";

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

  const addLineBreaks = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let i = 0;
    for (const line of lines) {
      elements.push(<span key={i}>{line}</span>);
      i++;
      elements.push(<br key={i} />);
      i++;
    }
    return elements;
  };

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
        <main className="flex flex-1 flex-wrap items-center justify-center">
          <div className="m-10 flex max-w-4xl flex-col gap-10 text-white md:gap-16 lg:min-w-full">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
              {event.data.title}
            </h1>
            <div className="text-lg lg:text-xl">
              {addLineBreaks(event.data.content)}
            </div>
          </div>
          <></>
        </main>
        <Footer />
      </Page>
    </>
  );
};

export default Event;
