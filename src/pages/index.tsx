import { type InferGetStaticPropsType, type NextPage } from "next";
import Head from "next/head";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../server/trpc/router/_app";
import superjson from "superjson";
import { createContext } from "../server/trpc/context";
import { trpc } from "../utils/trpc";
import Page from "../components/layout/page";
import HomeContent from "../components/content/home-content";
import EventBoard from "../components/content/event-board";
import LinkButton from "../components/control/link-button";
import { dateToYYYYmmdd } from "../utils/text";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  const todayString = dateToYYYYmmdd(new Date());

  await ssg.event.future.prefetch({ today: new Date(todayString) });
  await ssg.home.get.prefetch();
  await ssg.sponsor.all.prefetch();

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
          {home.data && (
            <HomeContent
              data={{ ...home.data, imageUrl: home.data.image?.url ?? null }}
            />
          )}
          <div className="flex max-w-4xl flex-col items-center justify-center p-8 text-center text-white">
            <div className="mb-10 flex flex-wrap items-center justify-center gap-20">
              <LinkButton href="/join">Liity jäseneksi!</LinkButton>
              <LinkButton href="/contact">Ota yhteyttä!</LinkButton>
            </div>
            {events.data && events.data.length !== 0 && (
              <>
                <EventBoard events={events.data} title="Tulevat tapahtumat" />
                <Link
                  className="mt-2 self-end rounded-3xl border border-transparent p-3 text-lg transition-colors duration-300 hover:border-white"
                  href="/events"
                >
                  Kaikki tapahtumat
                  <span className="ml-2">
                    <FontAwesomeIcon icon={faArrowRight} color="white" />
                  </span>
                </Link>
              </>
            )}
          </div>
        </main>
        <Footer />
      </Page>
    </>
  );
};

export default Home;
