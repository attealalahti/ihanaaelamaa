import { type InferGetStaticPropsType, type NextPage } from "next";
import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../server/trpc/router/_app";
import superjson from "superjson";
import { createContext } from "../server/trpc/context";
import { trpc } from "../utils/trpc";
import Page from "../components/page";
import HomeContent from "../components/home-content";
import EventBoard from "../components/event-board";
import LinkButton from "../components/link-button";

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  const todayString = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  await ssg.event.future.prefetch({ today: new Date(todayString) });
  await ssg.home.get.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
      todayString,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  todayString,
}) => {
  const events = trpc.event.future.useQuery(
    { today: new Date(todayString) },
    { enabled: false }
  );

  const home = trpc.home.get.useQuery(undefined, { enabled: false });

  return (
    <>
      <Head>
        <title>Ihanaa Elämää ry</title>
        <meta name="description" content="Burleskiyhdistys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center">
          {home.data && <HomeContent data={home.data} />}
          <div className="flex max-w-4xl flex-col items-center justify-center gap-16 p-8 text-center text-white">
            <div className="flex flex-wrap items-center justify-center gap-20">
              <LinkButton href="/join">Liity jäseneksi!</LinkButton>
              <LinkButton href="/contact">Ota yhteyttä!</LinkButton>
            </div>
            {events.data && events.data.length !== 0 && (
              <EventBoard events={events.data} title="Tulevat tapahtumat" />
            )}
          </div>
        </main>
        <Footer />
      </Page>
    </>
  );
};

export default Home;
